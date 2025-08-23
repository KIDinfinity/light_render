import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetDefaultJuvenileAgeRange from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetDefaultJuvenileAgeRange';
import { NAMESPACE } from '../activity.config';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import { formUtils } from 'basic/components/Form';

interface IProps {
  clientId: string;
  readOnly: boolean;
}

export default ({ clientId, readOnly }: IProps) => {
  const [
    minAgeConditionForLegalRepresentative,
    maxAgeConditionForLegalRepresentative,
  ] = useGetDefaultJuvenileAgeRange();

  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, readOnly ? `entities.clientMap` : `modalData.entities.clientMap`),
    shallowEqual
  );
  return useMemo(() => {
    if (
      lodash.isNumber(minAgeConditionForLegalRepresentative) &&
      lodash.isNumber(maxAgeConditionForLegalRepresentative)
    ) {
      return lodash
        .chain(clientMap)
        .omit(clientId)
        .map((client: any) => client?.personalInfo)
        .filter((client: any) => {
          const customerRole = formUtils.queryValue(lodash.get(client, 'customerRole', []));
          return lodash.includes(customerRole, CustomerRole.Beneficiary);
        })
        .filter((client: any) => lodash.isNumber(client.customerAge))
        .some((client: any) => {
          const customerAge = client.customerAge;
          return (
            customerAge >= minAgeConditionForLegalRepresentative &&
            customerAge <= maxAgeConditionForLegalRepresentative
          );
        })
        .value();
    }
    return false;
  }, [
    clientMap,
    clientId,
    minAgeConditionForLegalRepresentative,
    maxAgeConditionForLegalRepresentative,
  ]);
};
