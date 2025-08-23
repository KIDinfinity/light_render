import { useMemo } from 'react';
import lodash from 'lodash';
import useGetOriginCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';

export default () => {
  const coverageList = useGetOriginCoverageList();
  const jj = lodash.map(coverageList, (coverage: any) => coverage.jointLifeNo);
  return useMemo(() => {
    return lodash.some(coverageList, (coverage: any) => {
      const jointLifeNo = lodash.get(coverage, 'jointLifeNo');
      return jointLifeNo !== '00' && !lodash.isNil(jointLifeNo);
    });
  }, [coverageList]);
};
