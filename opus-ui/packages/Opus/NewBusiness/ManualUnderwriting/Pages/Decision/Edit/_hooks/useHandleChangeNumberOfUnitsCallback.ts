import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCoverageDataSource from 'decision/components/Benefit/_hooks/useGetCoverageDataSource';
import useHandleChangePlanOptionCallback from './useHandleChangePlanOptionCallback';
import CoverageType from 'opus/NewBusiness/ManualUnderwriting/_enum/CoverageType';
import BenefitPlanEditInd from 'opus/NewBusiness/ManualUnderwriting/_enum/BenefitPlanEditInd';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
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

  const { isMain, coverageInsuredList = [], id: coverageId } = currentCoverage;
  const currentCoverageClientId = coverageInsuredList[0]?.clientId;
  const productCode = formUtils.queryValue(currentCoverage?.coreCode);

  const handleChangePlanOption = useHandleChangePlanOptionCallback({
    productCode,
    coverageId,
  });
  return useCallback(
    (value: any) => {
      if (field === 'hospitalPlanCode') {
        handleChangePlanOption(value);
      }
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
    [
      isMain,
      coverageList,
      planProductConfig,
      dispatch,
      field,
      currentCoverageClientId,
      handleChangePlanOption,
    ]
  );
};
