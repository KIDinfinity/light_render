import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import ProductType from 'process/NB/ManualUnderwriting/Enum/ProductType';
export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((coverageItem: any) => {
          return formUtils.queryValue(coverageItem?.productType) === ProductType.RT;
        })
        .get('annualPrem')
        .value()
    );
  }, [coverageList]);
};
