import { useMemo } from 'react';
import CustomerRole from 'basic/enum/CustomerRole';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default ({ item }: { item: any }) => {
  const dicts = useSelector((state: any) => state.manualUnderwriting?.roleDicts, shallowEqual);

  return useMemo(() => {
    let hasAuthorisedSignatory = false; // 初始值
    if (lodash.isArray(dicts)) {
      for (let i = 0; i < dicts?.length; i++) {
        if (dicts[i]?.dictCode === CustomerRole.AuthorisedSignatory && dicts[i]?.display === 'Y') {
          hasAuthorisedSignatory = true;
          break;
        }
      }
    }

    const isCustomerIndividual: boolean = useGetIsCustomerIndividual(item);

    // 判断roleList里是否有PolicyOwner
    const isOwner: boolean =
      lodash
        .chain(item)
        .get('roleList')
        .filter((roleData) => !roleData.deleted)
        .findIndex((roleItem: any) => roleItem.customerRole === CustomerRole.PolicyOwner)
        .value() >= 0;

    return hasAuthorisedSignatory && !isCustomerIndividual && isOwner;
  }, [item, dicts]);
};
