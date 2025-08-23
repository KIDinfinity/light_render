import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }: any) => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    return lodash
      .chain(list)
      .find((item: any) => {
        return item?.id === id;
      })
      .get('roleList', [])
      .value();
  }, [list, id]);
};
