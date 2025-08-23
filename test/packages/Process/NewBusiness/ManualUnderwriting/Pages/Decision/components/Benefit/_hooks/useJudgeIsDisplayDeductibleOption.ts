import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import CoverageType from 'process/NewBusiness/ManualUnderwriting/_enum/CoverageType';
import { formUtils } from 'basic/components/Form';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig
  );
  const coverageList = useGetCoverageList('edit');
  if (!lodash.isArray(coverageList)) {
    return false;
  }
  return useMemo(() => {
    const { basicPlanProductFeatureList, otherPlanProductFeatureList } = planProductConfig;
    let planCheck = false;
    coverageList.forEach((item) => {
      let compareList;
      if (item.isMain === CoverageType.BasicProduct) {
        compareList = basicPlanProductFeatureList;
      } else if (item.isMain === CoverageType.Rider) {
        compareList = otherPlanProductFeatureList;
      }
      if (lodash.isArray(compareList)) {
        const targetItem = compareList.find((ele) => {
          return ele.productCode === formUtils.queryValue(item.coreCode);
        });
        if (
          targetItem &&
          (targetItem.deductibleCode === 'Y' || targetItem.deductibleCode === 'C')
        ) {
          planCheck = true;
        }
      }
    });
    return planCheck;
  }, [planProductConfig, coverageList]);
};
