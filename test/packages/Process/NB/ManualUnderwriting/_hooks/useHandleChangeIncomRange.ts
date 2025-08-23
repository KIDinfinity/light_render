import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

export default ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      const annualIncomeRangeMapping = {
        '01': 25000,
        '02': 35999,
        '03': 50999,
        '04': 75999,
        '05': 99999,
        '06': 149999,
        '07': 200000,
        '08': 200000 + 1,
      };

      const annualIncome = lodash.get(annualIncomeRangeMapping, key);
      const monthlyIncome = annualIncome / 12;

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
