import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import BenefitPlanEditInd from 'opus/NewBusiness/ManualUnderwriting/_enum/BenefitPlanEditInd';
import useGetCurrentCoverageIsMain from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import CoverageType from 'opus/NewBusiness/ManualUnderwriting/_enum/CoverageType';

export default ({ id }: any) => {
  const otherPlanProductFeatureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.planProductConfig?.otherPlanProductFeatureList,
    shallowEqual
  );
  const isMain = useGetCurrentCoverageIsMain({ id });
  const coverageList = useGetCoverageList('edit');
  return useMemo(() => {
    if (isMain === CoverageType.BasicProduct) {
      return false;
    }
    const currentCoreCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('coreCode')
        .value()
    );
    return lodash
      .chain(otherPlanProductFeatureList)
      .some((item: any) => {
        // benefitPlanEditInd为R的rider，plan option不可编辑
        if (item?.riderCodeList?.includes(currentCoreCode)) {
          const currentRider = lodash.find(
            item?.relatedRider,
            (rider) => rider.productCode === currentCoreCode
          );

          if (currentRider?.benefitPlanEditInd === BenefitPlanEditInd.FollowAttachedBenefit) {
            return true;
          }
        }

        return (
          [BenefitPlanEditInd.NotPassNano, BenefitPlanEditInd.FollowBasicProduct].includes(
            item?.benefitPlanEditInd
          ) && item?.productCode === currentCoreCode
        );
      })
      .value();
  }, [otherPlanProductFeatureList, id, coverageList, isMain]);
};
