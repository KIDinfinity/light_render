import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetClientDetailList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList.ts';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { shallowEqual } from 'react-redux';
import CustomerRole from 'enum/CustomerRole';

export default () => {
  const clients = useGetClientDetailList();
  const mibInfoList = useSelector(
    ({ [NAMESPACE]: namespace }: any) => namespace.processData.mibInfoList,
    shallowEqual
  );

  return useMemo(() => {
    return lodash
      .chain(mibInfoList)
      .map((item: any) => {
        const clientId = formUtils.queryValue(item?.clientId);
        const targetClient = lodash
          .chain(clients)
          .find((client: any) => client.id === clientId)
          .value();
        const hasInsured = lodash
          .chain(targetClient)
          .get('customerRole')
          .some((roleItem: any) => roleItem === CustomerRole.Insured)
          .value();

        const hasPayor = lodash
          .chain(targetClient)
          .get('customerRole')
          .some((roleItem: any) => roleItem === CustomerRole.Payor)
          .value();
        const customerRole = (() => {
          if (hasInsured && hasPayor) {
            return CustomerRole.Insured;
          }
          if (hasInsured) {
            return CustomerRole.Insured;
          }
          if (hasPayor) {
            return CustomerRole.Payor;
          }
        })();
        return {
          ...item,
          customerRole,
        };
      })
      .value();
  }, [mibInfoList, clients]);
};
