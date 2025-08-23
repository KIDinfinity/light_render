import { useMemo } from 'react';
import lodash from 'lodash';
import useGetOriginCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';
import type Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';

export default (type?: Mode) => {
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
