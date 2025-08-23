import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { multiply , divide } from '@/utils/precisionUtils';

export default (id: string, type: 0 | 1 = 0) => {
  const dispatch = useDispatch();
  return useCallback(
    (value: number) => {
      const changedFields: any = {};
      if (type === 0) {
        changedFields.monthlyIncome = divide(value, 12);
      } else {
        changedFields.annualIncome = multiply(value, 12);
      }

      dispatch({
        type: `${NAMESPACE}/saveFinancialInfo`,
        payload: {
          changedFields,
          id,
        },
      });
    },
    [id]
  );
};
