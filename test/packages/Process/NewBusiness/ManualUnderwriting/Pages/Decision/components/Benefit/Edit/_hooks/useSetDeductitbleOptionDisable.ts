import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetCurrentCoverageIsMain from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import CoverageType from 'process/NewBusiness/ManualUnderwriting/_enum/CoverageType';

export default ({ id }: any) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const otherPlanProductFeatureList = planProductConfig?.otherPlanProductFeatureList;
  const basicPlanProductFeatureList = planProductConfig?.basicPlanProductFeatureList;
  const isMain = useGetCurrentCoverageIsMain({ id });
  const coverageList = useGetCoverageList('edit');
  const curCoverage = coverageList.find((item) => item.id === id);
  return useMemo(() => {
    let targetItem;
    if (isMain === CoverageType.BasicProduct) {
      targetItem = basicPlanProductFeatureList?.find(
        (item) => item.productCode === formUtils.queryValue(curCoverage.coreCode)
      );
    } else {
      targetItem = otherPlanProductFeatureList?.find(
        (item) => item.productCode === formUtils.queryValue(curCoverage.coreCode)
      );
    }
    if (lodash.isPlainObject(targetItem)) {
      return targetItem?.deductibleCode !== 'Y';
    }
    return true;
  }, [planProductConfig, id, coverageList, isMain]);
};
