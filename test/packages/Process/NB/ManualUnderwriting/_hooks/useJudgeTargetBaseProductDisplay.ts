import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ targetProduct }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .find((coverageItem) => formUtils.queryValue(coverageItem?.isMain) === 'Y')
      .get('productCode')
      .isEqual(targetProduct)
      .value();
  }, [coverageList, targetProduct]);
};
