import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';
import { formUtils } from 'basic/components/Form';

export default () => {
  const basicProductList = useGetBasicProductData();
  const basicProductCode = formUtils.queryValue(basicProductList?.coreCode);
  const coverageList = useGetCoverageList();
  const loadingMappingRule = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadingMappingRule,
    shallowEqual
  );

  return useMemo(() => {
    const targetRiderCode = lodash
      .chain(loadingMappingRule)
      .filter((item: any) => {
        return item?.productCode === basicProductCode;
      })
      .map((item: any) => item?.targetRiderCode)
      .value();

    return lodash
      .chain(coverageList)
      .find((item) => lodash.includes(targetRiderCode, formUtils.queryValue(item?.coreCode)))
      .get('id')
      .value();
  }, [loadingMappingRule, coverageList]);
};
