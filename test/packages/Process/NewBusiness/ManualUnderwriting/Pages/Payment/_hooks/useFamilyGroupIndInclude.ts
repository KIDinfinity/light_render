import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default (params: {groupInd: string[]}) => {
  const {groupInd} = params
  const basicPlanProductFeatureList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.planProductConfig?.basicPlanProductFeatureList
  );
  const coverageListReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList
  );
  const coverageCodes = lodash.map(coverageListReadOnly, ({ coreCode }: any) =>
    formUtils.queryValue(coreCode)
  );
  return useMemo(() => {
    return (
      !!coverageCodes.length &&
      lodash.some(basicPlanProductFeatureList, ({ relatedRider = [] }: any) => {
        return lodash.some(relatedRider, ({ healthFamilyGroupInd, productCode }: any) => {
          return groupInd.includes(healthFamilyGroupInd) && coverageCodes.includes(productCode);
        });
      })
    );
  }, [coverageCodes, basicPlanProductFeatureList,groupInd]);
};
