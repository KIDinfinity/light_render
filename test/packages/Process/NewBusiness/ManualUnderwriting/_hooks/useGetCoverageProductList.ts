import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList('edit');
  return useMemo(() => {
    const coreCodeList = lodash
      .chain(coverageList)
      .map((item) => formUtils.queryValue(item.coreCode))
      .value();
    return coreCodeList;
  }, [coverageList]);
};
