import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList.ts';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';
import useGetCurrentContractTypeProductDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetCurrentContractTypeProductDicts.ts';
import useGetBasicProductData from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetBasicProductData.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export default () => {
  const coverageList = useGetCoverageList();
  const prodctDicts = useGetCurrentContractTypeProductDicts();
  const addingLoadingSelectedProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.addingLoadingSelectedProduct,
    shallowEqual
  );
  const basicProductList = useGetBasicProductData();
  const productCode = basicProductList?.productCode;
  const loadingCopyRule = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadingCopyRule,
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
          .find((product) => product?.productCode === item.coreCode)
          .get('productName')
          .value();
        const targetRiderCode = item.coreCode;
        const hasTtargetRider = lodash.find(loadingCopyRule, (data: any) => {
          return data.coverageCode === productCode && data.targetRiderCode === targetRiderCode;
        });
        const baseProductName = basicProductList?.productName;
        return {
          dictCode: formUtils.queryValue(item.coreCode),
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
