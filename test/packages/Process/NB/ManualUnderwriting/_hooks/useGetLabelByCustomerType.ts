import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import EntityCustomerLabel from 'process/NB/Enum/EntityCustomerLabel';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default ({ id, dictCode, typeCode }: any) => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    const customer = lodash
      .chain(list)
      .find((client: any) => client?.id === id)
      .value();
    const isCustomerIndividual = useGetIsCustomerIndividual(customer);
    if (!isCustomerIndividual) {
      return {
        dictCode: EntityCustomerLabel[`${dictCode}`],
        typeCode: 'Label_BIZ_Entity',
      };
    }
    return {
      dictCode,
      typeCode,
    };
  }, [id, list, dictCode, typeCode]);
};
