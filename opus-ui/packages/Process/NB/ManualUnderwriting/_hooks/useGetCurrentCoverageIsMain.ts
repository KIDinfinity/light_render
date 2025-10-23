import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCurrentCoverage from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverage';

export default ({ id }: any) => {
  const currentCoverage = useGetCurrentCoverage({ id });
  return useMemo(() => {
    return lodash.get(currentCoverage, 'isMain');
  }, [currentCoverage]);
};
