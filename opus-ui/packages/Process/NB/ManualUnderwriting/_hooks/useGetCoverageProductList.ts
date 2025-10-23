import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const coreCodeList = lodash
      .chain(coverageList)
      .map((item) => formUtils.queryValue(item.coreCode))
      .value();
    return coreCodeList;
  }, [coverageList]);
};
