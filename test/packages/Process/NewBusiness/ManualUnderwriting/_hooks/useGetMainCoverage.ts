import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ type }: any) => {
  const coverageList = useGetCoverageList(type);
  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .find((coverageItem) => formUtils.queryValue(coverageItem?.isMain) === 'Y')
        .value() || {}
    );
  }, [coverageList]);
};
