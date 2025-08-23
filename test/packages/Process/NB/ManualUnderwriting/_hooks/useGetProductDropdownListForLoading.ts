import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';
import useGetCurrentContractTypeProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
export default () => {
  const coverageList = useGetCoverageList();
  const prodctDicts = useGetCurrentContractTypeProductDicts();
  const addingLoadingSelectedProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.addingLoadingSelectedProduct,
    shallowEqual
  );
  const basicProductList = useGetBasicProductData();
  const productCode = basicProductList?.productCode;
  const loadingMappingRule = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadingMappingRule,
    shallowEqual
  );
  return useMemo(() => {
    const insuredName = formUtils.queryValue(addingLoadingSelectedProduct?.name);

    return lodash
      .chain(coverageList)
      .filter((item: any) =>
        [BenefitLevelDecision.NonStandard].includes(
          formUtils.queryValue(item?.coverageDecision?.uwDecision)
        )
      )
      .filter((item: any) => {
        if (insuredName) {
          return lodash
            .chain(item)
            .get('coverageInsuredList', [])
            .some((insured: any) => insured?.clientId === insuredName)
            .value();
        }
        return true;
      })
      .map((item: any) => {
        const name = lodash
          .chain(prodctDicts)
          .find((product) => product?.productCode === item.productCode)
          .get('productName')
          .value();
        const targetRiderCode = item.productCode;
        const hasTtargetRider = lodash.find(loadingMappingRule, (data: any) => {
          return data.productCode === productCode && data.targetRiderCode === targetRiderCode;
        });
        const baseProductName = basicProductList?.productName;

        return {
          dictCode: formUtils.queryValue(item.productCode),
          dictName: hasTtargetRider
            ? `${name} (follow ${baseProductName})`
            : name || formUtils.queryValue(item.productName),
        };
      })
      .filter((item: any) => {
        return !lodash.isEmpty(item.dictCode) && !lodash.isEmpty(item.dictName);
      })
      .value();
  }, [coverageList, prodctDicts, addingLoadingSelectedProduct]);
};
