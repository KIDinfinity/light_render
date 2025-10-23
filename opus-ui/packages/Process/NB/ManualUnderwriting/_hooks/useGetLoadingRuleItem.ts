import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ coverageId, key }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .find((item: any) => item.id === coverageId)
      .get(`loadingRule.${key}`)
      .value();
  }, [coverageId, coverageList, key]);
};
