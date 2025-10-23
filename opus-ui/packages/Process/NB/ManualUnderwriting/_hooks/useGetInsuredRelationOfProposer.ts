import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default () => {
  const list = useGetClientDetailList();
  const insuredRelationOfProposer = useMemo(() => {
    const relationOfProposer = lodash
      .chain(list)
      .find((client: any) => {
        return lodash
          .chain(client)
          .get('roleList', [])
          .map((role: any) => role.customerRole)
          .includes(CustomerRole.Insured)
          .value();
      })
      .get('relationOfProposer')
      .value();
    return formUtils.queryValue(relationOfProposer);
  }, [list]);
  return insuredRelationOfProposer;
};
