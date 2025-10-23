import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCorverageFieldDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetCorverageFieldDefaultValue';
import useGetNeedTriggerByCondtion from 'process/NB/ManualUnderwriting/_hooks/useGetNeedTriggerByCondtion';
import useGetPlanProductConfigList from 'process/NB/ManualUnderwriting/_hooks/useGetPlanProductConfigList';
import { formUtils } from 'basic/components/Form';

export default ({ id, targetField, ownField, conditionFieldKey, conditionFieldValue }: any) => {
  const dispatch = useDispatch();
  const handleGetTrigger = useGetNeedTriggerByCondtion({ conditionFieldKey, conditionFieldValue });
  const handleGetDefaultValue = useGetCorverageFieldDefaultValue({
    fieldKey: targetField,
    ownField,
  });
  const planProductConfigList = useGetPlanProductConfigList();
  return useCallback(
    (coreCode) => {
      if (
        lodash
          .chain(planProductConfigList)
          .find((item: any) => item?.productCode === coreCode)
          .get('requiredRiderCodeList', [])
          .isEmpty()
          .value()
      ) {
        const productCode = formUtils.queryValue(coreCode);
        const needTrigger: boolean = ['indemnifyPeriodUnit', 'payPeriodUnit'].includes(ownField)
          ? true
          : handleGetTrigger(productCode);
        if (needTrigger) {
          const value = handleGetDefaultValue(productCode);
          dispatch({
            type: `${NAMESPACE}/setDecisionFieldData`,
            payload: {
              id,
              changedFields: {
                [ownField]: value,
              },
            },
          });
        }
      }
    },
    [id, conditionFieldKey, conditionFieldValue, handleGetDefaultValue]
  );
};
