import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';
import ProductType from 'process/NewBusiness/ManualUnderwriting/_enum/ProductType';
const targetProductType = [ProductType.ILP, ProductType.RT, ProductType.AT];

export default () => {
  const coverageList = useGetCoverageList(Mode.Edit);
  return useMemo(() => {
    const isMatchTargeProduct = lodash
      .chain(coverageList)
      .some((coverageItem) => {
        return lodash.includes(targetProductType, formUtils.queryValue(coverageItem?.productType));
      })
      .value();
    const isMatchProductType = lodash
      .chain(coverageList)
      .some((coverageItem) => {
        const productType = formUtils.queryValue(coverageItem?.productType);
        const productCategory = formUtils.queryValue(coverageItem?.productCategory);
        return productType === 'RT' && productCategory === 'MRT';
      })
      .value();
    return isMatchTargeProduct && isMatchProductType;
  }, [coverageList]);
};
