import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';
import useGetCurrentCoverage from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverage';
import CoverageType from 'process/NB/ManualUnderwriting/Enum/CoverageType';
import BenefitPlanEditInd from 'process/NB/ManualUnderwriting/Enum/BenefitPlanEditInd';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id, field }: any) => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageDataSource();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const { isMain, coverageInsuredList = [] } = useGetCurrentCoverage({ id }) || {};
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
              currentCoverageClientId === coverageItem.coverageInsuredList[0]?.clientId
            ) {
              const parentCoverageConfig = lodash
                .get(planProductConfig, 'otherPlanProductFeatureList', [])
                .find((configItem: any) => {
                  return configItem?.riderCodeList?.includes(coverageItem.productCode);
                });

              if (parentCoverageConfig) {
                const coverageConfig = parentCoverageConfig.relatedRider?.find(
                  (rider: any) => rider.productCode === coverageItem.productCode
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
