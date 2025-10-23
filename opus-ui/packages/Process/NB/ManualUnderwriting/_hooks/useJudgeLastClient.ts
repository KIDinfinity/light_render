import { useMemo } from 'react';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import lodash from 'lodash';
export default () => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    // 如果是最后一个客人且deleted!==1，不显示删除按钮
    const idDeletedList = lodash.filter(list, (item: any) => item?.deleted !== 1);
    const isLastClient = idDeletedList?.length === 1;
    return isLastClient;
  }, [list]);
};
