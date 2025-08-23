import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageDataSource from 'decision/components/Benefit/_hooks/useGetCoverageDataSource';
import CoverageType from 'process/NewBusiness/ManualUnderwriting/_enum/CoverageType';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import BenefitPlanEditInd from 'process/NewBusiness/ManualUnderwriting/_enum/BenefitPlanEditInd';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

// 处理新增下级产品时没有自动匹配上级产品的Plan Option的问题
export default ({ id }: any) => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageDataSource('edit');
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const currentCoverage = useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .find((item: any) => item?.id === id)
        .value() || {}
    );
  }, [coverageList, id]);

  const { isMain, coverageInsuredList = [] } = currentCoverage;
  const currentCoverageClientId = formUtils.queryValue(coverageInsuredList[0]?.clientId);

  return useCallback(
    (coreCode) => {
      if (
        isMain === CoverageType.BasicProduct ||
        lodash.isEmpty(coreCode) ||
        tenant.remoteRegion() === Region.MY
      ) {
        return;
      }

      const parentCoverageConfig = lodash
        .get(planProductConfig, 'otherPlanProductFeatureList', [])
        .find((configItem: any) => {
          return configItem?.riderCodeList?.includes(coreCode);
        });

      if (parentCoverageConfig) {
        const coverageConfig = parentCoverageConfig.relatedRider?.find(
          (rider: any) => rider.productCode === coreCode
        );

        if (coverageConfig) {
          const shouldFollow =
            coverageConfig.benefitPlanEditInd === BenefitPlanEditInd.FollowAttachedBenefit;

          if (shouldFollow) {
            const parentCoverage = lodash.find(
              coverageList,
              (coverageItem: any) =>
                parentCoverageConfig.productCode &&
                parentCoverageConfig.productCode === formUtils.queryValue(coverageItem?.coreCode) &&
                coverageItem.coverageInsuredList &&
                currentCoverageClientId ===
                  formUtils.queryValue(coverageItem.coverageInsuredList[0]?.clientId)
            );

            if (parentCoverage?.hospitalPlanCode) {
              dispatch({
                type: `${NAMESPACE}/setDecisionFieldData`,
                payload: {
                  changedFields: {
                    hospitalPlanCode: parentCoverage.hospitalPlanCode,
                  },
                  id,
                },
              });
            }
          }
        }
      }
    },
    [
      coverageList,
      currentCoverage,
      currentCoverageClientId,
      dispatch,
      id,
      isMain,
      planProductConfig,
    ]
  );
};
