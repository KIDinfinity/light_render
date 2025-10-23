import lodash from 'lodash';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default () => {
  const coverageList = useGetCoverageList('edit');
  const { otherPlanProductFeatureList = [], basicPlanProductFeatureList = [] } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig || {}
  );
  const mainProduct = lodash.find(coverageList, (item: any) => item?.isMain === 'Y');
  const otherProduct = lodash.filter(coverageList, (item: any) => item?.isMain !== 'Y');
  return useMemo(() => {
    const mainProductConfig = basicPlanProductFeatureList.find(
      (item) =>
        item.productCode === formUtils.queryValue(mainProduct?.coreCode || mainProduct?.productCode)
    );
    const otherProductRequest = otherPlanProductFeatureList.some((item) => {
      return otherProduct.some((product) => {
        const productCode = formUtils.queryValue(product.coreCode || product.productCode);
        return (
          productCode === item.productCode &&
          item.productType === 'RT' &&
          item.productCategory === 'MRT'
        );
      });
    });
    return mainProductConfig?.productType === 'ILP' && otherProductRequest;
  }, [otherPlanProductFeatureList, basicPlanProductFeatureList, mainProduct, otherProduct]);
};
