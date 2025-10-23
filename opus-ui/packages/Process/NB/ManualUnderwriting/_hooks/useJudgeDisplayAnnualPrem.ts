import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

const targetProductType = ['ILP', 'RT', 'AT'];

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .some((coverageItem) => {
        return lodash.includes(targetProductType, formUtils.queryValue(coverageItem?.productType));
      })
      .value();
  }, [coverageList]);
};
