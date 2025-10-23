import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { scaleByNumber } from '@/utils/utils';

export default (id: string, type: 0 | 1 = 0, magnification: number | undefined) => {
  const dispatch = useDispatch();
  return useCallback(
    (value: number) => {
      let annualIncome: number, monthlyIncome: number;
      if (type === 0) {
        annualIncome = scaleByNumber(magnification, value);
        monthlyIncome = scaleByNumber(magnification, value / 12);
      } else {
        monthlyIncome = scaleByNumber(magnification, value);
        annualIncome = scaleByNumber(magnification, value * 12);
      }

      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          changedFields: {
            annualIncome,
            monthlyIncome,
          },
          id,
        },
      });
    },
    [id]
  );
};
