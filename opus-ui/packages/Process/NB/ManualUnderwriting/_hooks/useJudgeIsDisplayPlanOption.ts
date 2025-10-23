import { useMemo } from 'react';
import lodash from 'lodash';
// import { formUtils } from 'basic/components/Form';
// import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetCfgPlanDictProduct from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanDictProduct';
// const targetProductType = ['ILP', 'RT', 'AT'];

export default () => {
  // const coverageList = useGetCoverageList();
  const numberofunitsList = useGetCfgPlanDictProduct();

  return useMemo(() => {
    const planCheck = lodash.some(numberofunitsList, (item) =>
      lodash.isArray(item?.planHospitalBenefitUnitList)
        ? item?.planHospitalBenefitUnitList?.length > 0
        : lodash.isArray(item?.planHospitalBenefitList)
    );
    // if (planCheck) {
    //   return lodash.some(coverageList, (coverage: any) => {
    //     return lodash.includes(targetProductType, formUtils.queryValue(coverage?.productType));
    //   });
    // } else {
    //   return false;
    // }
    return planCheck;
  }, [numberofunitsList]);
};
