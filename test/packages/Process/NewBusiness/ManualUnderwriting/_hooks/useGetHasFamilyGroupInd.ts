import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default (readOnly = true) => {
  const basicPlanProductFeatureList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.planProductConfig?.basicPlanProductFeatureList
  );
  const coverageListReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList
  );
  const coverageListEdit = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.modalData.processData?.coverageList;
  });
  const coverageList = readOnly ? coverageListReadOnly : coverageListEdit;
  const coverageCodes = lodash.map(coverageList, ({ coreCode }: any) =>
    formUtils.queryValue(coreCode)
  );

  return useMemo(() => {
    return (
      !!coverageCodes.length &&
      lodash.some(basicPlanProductFeatureList, ({ relatedRider = [] }: any) => {
        return lodash.some(relatedRider, ({ healthFamilyGroupInd, productCode }: any) => {
          return healthFamilyGroupInd === 'Y' && coverageCodes.includes(productCode);
        });
      })
    );
  }, [coverageCodes, basicPlanProductFeatureList]);
};
