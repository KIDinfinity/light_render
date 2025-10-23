import { useMemo } from 'react';
import lodash from 'lodash';
import useGetOriginCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';

export default (type?: string) => {
  const coverageList: any = useGetOriginCoverageList(type);

  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .filter(
          (coverage: any) => coverage.jointLifeNo === '00' || lodash.isNil(coverage.jointLifeNo)
        )
        .value() || []
    );
  }, [coverageList]);
};
