import { useMemo } from 'react';
import { useSelector } from 'dva';
import { useGetCoverageList } from 'process/NewBusiness/ManualUnderwriting/_hooks';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const targetContractType = ['TFP'];
const targetCode = ['PB', 'WP'];

export default () => {
  const { caseType } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData || {}
  );
  const { otherPlanProductFeatureList = [] } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig || {}
  );
  const coverageList = useGetCoverageList();

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
