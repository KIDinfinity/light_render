import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList.ts';

export default ({ coverageId }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageExclusionList')
        .value() || []
    );
  }, [coverageList, coverageId]);
};
