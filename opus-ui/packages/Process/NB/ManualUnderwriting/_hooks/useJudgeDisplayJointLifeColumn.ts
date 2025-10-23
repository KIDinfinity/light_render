import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash.some(coverageList, (coverage: any) => {
      const jointLifeNo = lodash.get(coverage, 'jointLifeNo');
      return jointLifeNo !== '00' && !lodash.isNil(jointLifeNo);
    });
  }, [coverageList]);
};
