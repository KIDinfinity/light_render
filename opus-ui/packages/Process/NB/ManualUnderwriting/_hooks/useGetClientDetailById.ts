import { useMemo } from 'react';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import lodash from 'lodash';

export default ({ clientId }: any) => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    return lodash
      .chain(list)
      .find((item: any) => item.id === clientId)
      .value();
  }, [list, clientId]);
};
