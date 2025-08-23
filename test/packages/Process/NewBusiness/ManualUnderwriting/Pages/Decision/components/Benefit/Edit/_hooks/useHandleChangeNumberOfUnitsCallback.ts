import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageDataSource from 'decision/components/Benefit/_hooks/useGetCoverageDataSource';
import CoverageType from 'process/NewBusiness/ManualUnderwriting/_enum/CoverageType';
import BenefitPlanEditInd from 'process/NewBusiness/ManualUnderwriting/_enum/BenefitPlanEditInd';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id, field }: any) => {
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
  const currentCoverageClientId = coverageInsuredList[0]?.clientId;

  return useCallback(
    (value: any) => {
      if (isMain === CoverageType.BasicProduct) {
        lodash
          .chain(coverageList)
          .filter((coverageItem: any) => {
            const benefitPlanEditInd = lodash
              .chain(planProductConfig)
              .get('otherPlanProductFeatureList', [])
              .find(
                (configItem: any) =>
                  configItem.productCode === formUtils.queryValue(coverageItem.coreCode)
              )
              .get('benefitPlanEditInd')
              .value();
            return (
              coverageItem.isMain === CoverageType.Rider &&
              benefitPlanEditInd === BenefitPlanEditInd.FollowBasicProduct
            );
          })
          .forEach((coverageItem: any) => {
            dispatch({
              type: `${NAMESPACE}/setDecisionFieldData`,
              payload: {
                changedFields: {
                  [field]: value,
                },
                id: coverageItem?.id,
              },
            });
          })
          .value();
      } else {
        lodash
          .chain(coverageList)
          .filter((coverageItem: any) => {
            if (
              currentCoverageClientId &&
              coverageItem?.coverageInsuredList &&
              currentCoverageClientId ===
                formUtils.queryValue(coverageItem.coverageInsuredList[0]?.clientId)
            ) {
              const parentCoverageConfig = lodash
                .get(planProductConfig, 'otherPlanProductFeatureList', [])
                .find((configItem: any) => {
                  return configItem?.riderCodeList?.includes(
                    coverageItem.productCode || formUtils.queryValue(coverageItem.coreCode)
                  );
                });

              if (parentCoverageConfig) {
                const coverageConfig = parentCoverageConfig.relatedRider?.find(
                  (rider: any) =>
                    rider.productCode ===
                    (coverageItem.productCode || formUtils.queryValue(coverageItem.coreCode))
                );

                if (coverageConfig) {
                  return (
                    coverageConfig.benefitPlanEditInd === BenefitPlanEditInd.FollowAttachedBenefit
                  );
                }
              }
            }

            return false;
          })
          .forEach((coverageItem: any) => {
            dispatch({
              type: `${NAMESPACE}/setDecisionFieldData`,
              payload: {
                changedFields: {
                  [field]: value,
                },
                id: coverageItem?.id,
              },
            });
          })
          .value();
      }
    },
    [isMain, coverageList, planProductConfig, dispatch, field, currentCoverageClientId]
  );
};
