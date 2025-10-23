import { useCallback, useMemo } from 'react';
import lodash from 'lodash';
import useGetFlatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import SubProductType from 'opus/NewBusiness/ManualUnderwriting/_enum/SubProductType';

export default ({ productCode, coverageId }: any) => {
  const dispatch = useDispatch();
  const planProductConfig = useGetFlatProductConfig();
  const subProductType = useMemo(() => {
    return lodash
      .chain(planProductConfig)
      .find((item: any) => item.productCode === productCode)
      .get('subProductType')
      .value();
  }, [productCode, planProductConfig]);
  const cfgPlanHospitalBenefits = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.cfgPlanHospitalBenefits,
    shallowEqual
  );
  return useCallback(
    (hospitalPlanCode) => {
      if (subProductType !== SubProductType.MedicalRider) {
        const sumAssured = lodash
          .chain(cfgPlanHospitalBenefits)
          .find(
            (item: any) => item.productCode === productCode && item.benefitPlan === hospitalPlanCode
          )
          .get('sumAssured')
          .value();

        if (sumAssured) {
          dispatch({
            type: `${NAMESPACE}/setDecisionFieldData`,
            payload: {
              id: coverageId,
              changedFields: {
                sumAssured,
              },
            },
          });
        }
      }
    },
    [subProductType, productCode, coverageId, dispatch, cfgPlanHospitalBenefits]
  );
};
