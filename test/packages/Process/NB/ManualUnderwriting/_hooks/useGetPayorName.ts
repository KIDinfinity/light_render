import { useMemo } from 'react';
import lodash from 'lodash';
import CustomerRole from 'enum/CustomerRole';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetFullNameByClientInfo from 'process/NB/ManualUnderwriting/_hooks/useGetFullNameByClientInfo';
import { formUtils } from 'basic/components/Form';

export default () => {
  const list = useGetClientDetailList();
  const clientInfo = useMemo(() => {
    return lodash
      .chain(list)
      .find((clientItem: any) => {
        return lodash
          .chain(clientItem)
          .get('roleList', [])
          .some(
            (roleItem: any) => formUtils.queryValue(roleItem?.customerRole) === CustomerRole.Payor
          )
          .value();
      })
      .value();
  }, [list]);

  const name = useGetFullNameByClientInfo({
    clientInfo,
  });

  return name;
};
