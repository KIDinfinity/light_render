import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData,
    shallowEqual
  );
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.planProductConfig,
    shallowEqual
  );

  return useMemo(() => {
    const coverageCodes = lodash
      .get(businessData, 'policyList[0].coverageList', [])
      .map((item: any) => formUtils.queryValue(item.coreCode));

    return (
      !!coverageCodes.length &&
      lodash.get(planProductConfig, 'basicPlanProductFeatureList', []).some((item: any) => {
        const { relatedRider = [] } = item;

        return relatedRider?.some((rider: any) => {
          const { healthFamilyGroupInd, productCode } = rider;

          return healthFamilyGroupInd === 'Y' && coverageCodes.includes(productCode);
        });
      })
    );
  }, [businessData, planProductConfig]);
};
