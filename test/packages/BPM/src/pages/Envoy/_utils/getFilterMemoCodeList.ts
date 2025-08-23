import { tenant, Region } from '@/components/Tenant';
import { EMemoCode, EMemoStatus } from 'bpm/pages/Envoy/enum';

import lodash from 'lodash';

const renderFilter = ({ basicList, thisItem }: any) => {
  return tenant.region({
    [Region.PH]: () => {
      return (
        lodash
          .chain(basicList)
          .filter(
            (el: any) =>
              !!el?.requestedClientRole &&
              thisItem.requestedClientRole === el.requestedClientRole &&
              thisItem.requestedClientId === el.requestedClientId &&
              thisItem.memoCode !== el.memoCode
          )
          .map((el: any) => el?.memoCode)
          .value() || []
      );
    },
    notMatch: () => {
      return (
        lodash
          .chain(basicList)
          .filter(
            (el: any) =>
              thisItem?.requestedClientId === el?.requestedClientId &&
              thisItem?.memoCode !== el?.memoCode
          )
          .map((el: any) => el?.memoCode)
          .value() || []
      );
    },
  });
};

export default ({ pendingMemoList, thisItem, listMemos }: any) => {
  const basicList = lodash.filter(
    pendingMemoList,
    (el: any) => el?.memoStatus !== EMemoStatus.WAIVED && el?.memoCode !== EMemoCode.FREE
  );

  // 这里原本有一个useMemo，但因为依赖有一个basicList，而basicList是一个引用必变的新对象，因此useMemo是没有任何意义的
  const regionFilterList = renderFilter({ basicList, thisItem });
  if (!regionFilterList.length) {
    return listMemos;
  }
  return listMemos?.filter((item: any) => {
    if (item?.multiSelect) {
      return true;
    }
    return !lodash.includes(regionFilterList, item?.memoCode);
  });
};

export const getMultiMemoCodeList = ({ pendingMemoList, memoList, listMemos }: any) => {
  const basicList = lodash.filter(
    pendingMemoList,
    (el: any) => el?.memoStatus !== EMemoStatus.WAIVED && el?.memoCode !== EMemoCode.FREE
  );

  return memoList
    .map((thisItem) => renderFilter({ basicList, thisItem }))
    .map((regionFilterList) => {
      if (!regionFilterList.length) {
        return listMemos;
      }
      return listMemos.filter((item: any) => {
        if (item?.multiSelect) {
          return true;
        }
        return !lodash.includes(regionFilterList, item?.memoCode);
      });
    });
};
