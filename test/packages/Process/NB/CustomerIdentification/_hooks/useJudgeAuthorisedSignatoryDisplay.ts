import { useCallback } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';
import CustomerType from 'process/NB/Enum/CustomerType';
import { NAMESPACE } from 'process/NB/CustomerIdentification/activity.config';

export default () => {
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.roleDicts,
    shallowEqual
  );
  return useCallback(
    ({ item }: any) => {
      const hasAuthorisedSignatory = lodash.some(dicts, (dictItem: any) => {
        return dictItem.dictCode === CustomerRole.AuthorisedSignatory && dictItem?.display === 'Y';
      }); // 初始值

      const isEmpty = lodash.chain(item).get('customerType').isEqual(CustomerType.Entity);

      // 判断roleList里是否有PolicyOwner
      const isOwner: boolean = lodash
        .chain(item)
        .get('roleList')
        .some((roleItem: any) => roleItem.customerRole === CustomerRole.PolicyOwner)
        .value();
      return hasAuthorisedSignatory && isEmpty && isOwner;
    },
    [dicts]
  );
};
