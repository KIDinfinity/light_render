import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }: any) => {
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    const contactInfoList =
      lodash
        .chain(clientDetailList)
        .find((item: any) => item?.id === id)
        .get('contactInfoList', [])
        .filter((item: any) => item?.deleted !== 1)
        .sortBy('contactSeqNum')
        .value() || [];

    // 新增行需要插到最后
    const newItemIndex = lodash.findIndex(
      contactInfoList,
      (item: any) =>
        !formUtils.queryValue(item?.contactType) &&
        !formUtils.queryValue(item?.contactNo) &&
        !formUtils.queryValue(item?.countryCode)
    );
    if (~newItemIndex) {
      const newItem = contactInfoList.splice(newItemIndex, 1);
      if (newItem[0]) {
        contactInfoList.push(newItem[0]);
      }
    }

    return contactInfoList;
  }, [clientDetailList]);
  return result;
};
