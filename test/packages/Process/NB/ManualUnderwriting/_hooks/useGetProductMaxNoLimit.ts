import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageProductList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList';
import useGetCurrentContractTypeProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts';

export default () => {
  const productCodes = useGetCoverageProductList();
  const productConfigs = useGetCurrentContractTypeProductDicts();
  return useMemo(() => {
    return lodash
      .chain(productCodes)
      .filter((productCode: any) => {
        const maxNo = lodash
          .chain(productConfigs)
          .find((item: any) => item.productCode === productCode)
          .get('maxNo')
          .value();
        const addedProdcutCount =
          lodash.filter(productCodes, (item: any) => item === productCode)?.length || 0;
        if (lodash.isNull(maxNo)) {
          return false;
        }
        return lodash.toNumber(maxNo) <= addedProdcutCount;
      })
      .uniq()
      .value();
  }, [productConfigs, productCodes]);
};
