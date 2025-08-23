import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetFlatProductConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';
import useGetCurrentContractTypeProductDicts from 'decision/components/Benefit/_hooks/useGetCurrentContractTypeProductDicts.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const coverageList = useGetCoverageList();
  const prodctDicts = useGetCurrentContractTypeProductDicts();
  const planProductConfig = useGetFlatProductConfig();
  const productSection = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productSection,
    shallowEqual
  );
  return useMemo(() => {
    const insuredName = formUtils.queryValue(productSection?.name);
    return lodash
      .chain(coverageList)
      .filter((item: any) => {
        return [BenefitLevelDecision.NonStandard].includes(
          formUtils.queryValue(item?.coverageDecision?.uwDecision)
        );
      })
      .filter((item: any) => {
        const matchProductConfig = planProductConfig.find(product => product.productCode === item.coreCode);
        if(matchProductConfig?.exclusionEditInd === 'N')
          return false;
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
        return {
          dictCode: formUtils.queryValue(item.coreCode),
          dictName: name || formUtils.queryValue(item.productName),
        };
      })
      .filter((item: any) => {
        return !lodash.isEmpty(item.dictCode) && !lodash.isEmpty(item.dictName);
      })
      .value();
  }, [coverageList, prodctDicts, productSection]);
};
