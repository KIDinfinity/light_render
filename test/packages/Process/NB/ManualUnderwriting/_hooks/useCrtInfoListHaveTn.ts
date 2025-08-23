import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }: any) => {
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    const haveTn =
      lodash
        .chain(clientDetailList)
        .find((item: any) => item?.id === id)
        .get('crtInfoList', [])
        .map((item: any) =>item?.ctfType)
        .includes('TN')
        .value() || [];
    return haveTn;
  }, [clientDetailList, id]);
  return result;
};
