import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const targetContractType = ['TFP'];
const targetCode = ['PB', 'WP'];

export default () => {
  const caseType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData.caseType,
    shallowEqual
  );
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const { otherPlanProductFeatureList = [] } = planProductConfig;
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList');

  return useMemo(() => {
    if (!targetContractType.includes(caseType)) {
      return false;
    }

    const coverages = coverageList.filter((item) => item.isMain === 'N');

    return !coverages.some((item: any) => {
      const targetConfig = otherPlanProductFeatureList.find(
        (product: any) => product.productCode === item.productCode
      );

      if (targetConfig) {
        return targetCode.includes(targetConfig.wpPbCode);
      }

      return false;
    });
  }, [caseType, coverageList, otherPlanProductFeatureList]);
};
