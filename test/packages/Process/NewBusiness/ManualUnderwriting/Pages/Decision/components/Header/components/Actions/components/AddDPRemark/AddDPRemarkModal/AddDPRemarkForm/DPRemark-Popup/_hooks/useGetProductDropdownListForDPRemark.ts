import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetCurrentContractTypeProductDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetCurrentContractTypeProductDicts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const coverageList = useGetCoverageList();
  const productDicts = useGetCurrentContractTypeProductDicts();
  const addDPRemarkSelectedProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkSelectedProduct,
    shallowEqual
  );
  return useMemo(() => {
    const insuredName = formUtils.queryValue(addDPRemarkSelectedProduct?.name);
    if (lodash.isEmpty(coverageList)) return [];
    return (
      lodash
        .chain(coverageList)
        .filter((item: any) =>
          [BenefitLevelDecision.Decline, BenefitLevelDecision.Postpone].includes(
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
        .filter((item: any) => {
          const current: any = lodash
            .chain(productDicts)
            .find((product: any) => product?.productCode === formUtils.queryValue(item.coreCode))
            .value();
          return current.underwritingDecisionEditInd !== 'N';
        })
        .map((item: any) => {
          const current = lodash
            .chain(productDicts)
            .find((product) => product?.productCode === item.productCode)
            .value();
          const dictName =
            `${current?.productCode} - ${current?.productName}` ||
            `${formUtils.queryValue(item.productCode)} - ${formUtils.queryValue(item.productName)}`;
          return {
            dictCode: formUtils.queryValue(item.productCode),
            dictName,
          };
        })
        .filter((item: any) => {
          return (
            !lodash.isNull(item.dictCode) &&
            !lodash.isUndefined(item.dictCode) &&
            !lodash.isNull(item.dictName) &&
            !lodash.isUndefined(item.dictName)
          );
        })
        // .filter((item: any) => {
        //   return !lodash.isEmpty(item.dictCode) && !lodash.isEmpty(item.dictName);
        // })
        .value()
    );
  }, [addDPRemarkSelectedProduct?.name, coverageList, productDicts]);
};
