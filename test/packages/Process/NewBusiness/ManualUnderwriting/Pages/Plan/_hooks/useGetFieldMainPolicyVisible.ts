import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

// Jira:MDLTH-1609
export default () => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList
  );
  const basicPlanProductFeatureList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace?.planProductConfig?.basicPlanProductFeatureList
    ) || [];

  const productCodes = lodash.map(coverageList, ({ productCode }: any) => productCode);

  return useMemo(() => {
    return lodash
      .chain(basicPlanProductFeatureList)
      .some(({ relatedRider = [] }: any) => {
        return (
          !!productCodes.length &&
          relatedRider?.some(
            ({ healthFamilyGroupInd, productCode }: any) =>
              healthFamilyGroupInd === 'Y' && productCodes.includes(productCode)
          )
        );
      })
      .value();
  }, [productCodes, basicPlanProductFeatureList]);
};
