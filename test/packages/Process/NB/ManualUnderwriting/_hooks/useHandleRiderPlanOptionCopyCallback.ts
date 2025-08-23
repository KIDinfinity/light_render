import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import BenefitPlanEditInd from 'process/NB/ManualUnderwriting/Enum/BenefitPlanEditInd';
import CoverageType from 'process/NB/ManualUnderwriting/Enum/CoverageType';
import useGetCurrentCoverageIsMain from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';

export default ({ id, field }: any) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const dispatch = useDispatch();
  const isMain = useGetCurrentCoverageIsMain({ id });
  const coverageList = useGetCoverageDataSource();
  const planOptionValue = useMemo(() => {
    return lodash
      .chain(coverageList)
      .find((coverageItem: any) => coverageItem.isMain === CoverageType.BasicProduct)
      .get(field === 'numberOfUnits' ? 'unit' : field)
      .value();
  }, [coverageList, field]);
  return useCallback(
    (value: any) => {
      if (
        isMain === CoverageType.Rider &&
        lodash
          .chain(planProductConfig)
          .get('otherPlanProductFeatureList', [])
          .some((productItem: any) => {
            return (
              productItem?.productCode === value &&
              productItem?.benefitPlanEditInd === BenefitPlanEditInd.FollowBasicProduct
            );
          })
          .value()
      ) {
        dispatch({
          type: `${NAMESPACE}/setDecisionFieldData`,
          payload: {
            changedFields: {
              [field]: planOptionValue,
            },
            id,
          },
        });
      }
    },
    [dispatch, planProductConfig, isMain, planOptionValue]
  );
};
