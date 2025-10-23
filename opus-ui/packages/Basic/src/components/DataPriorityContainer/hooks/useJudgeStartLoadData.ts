import { useMemo } from 'react';
import useGetDataPriority from './useGetDataPriority';

export default ({ sectionPriority }: any) => {
  const dataPriority = useGetDataPriority();

  return useMemo(() => {
    return dataPriority === sectionPriority;
  }, [dataPriority, sectionPriority]);
};
