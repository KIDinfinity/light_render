import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }: any) => {
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    const crtInfoList = lodash
      .chain(clientDetailList)
      .find((item: any) => item?.id === id)
      .get('crtInfoList', [])
      .filter((item: any) => !item.deleted && item.ctfType === 'TN' && item.type === 'S')
      .orderBy(['country'], ['asc'])
      .value();
    return crtInfoList;
  }, [clientDetailList]);
  return result;
};
