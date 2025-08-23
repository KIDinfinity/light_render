import React from 'react';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import lodash from 'lodash';
import { updateUWDecision } from '@/services/owbNbCoverageUWDecisionServices';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';

export default () => {
  const coverageList = useGetCoverageList();
  const dispatch = useDispatch();
  return React.useCallback(
    async ({ uwDecision, id }) => {
      let baseDecision: string | undefined;
      const newCoverageList = lodash.map(coverageList, (item: any) => {
        if (id === item.id) {
          if (item.isMain && item.isMain === 'Y') baseDecision = uwDecision;
          return {
            ...item,
            coverageDecision: {
              ...item?.coverageDecision,
              uwDecision,
            },
          };
        }
        if (
          baseDecision &&
          (baseDecision === BenefitLevelDecision.Postpone ||
            baseDecision === BenefitLevelDecision.Decline)
        )
          return {
            ...item,
            coverageDecision: {
              ...item?.coverageDecision,
              uwDecision: baseDecision,
            },
          };
        return item;
      });

      try {
        const result = await updateUWDecision({ coverageList: newCoverageList });
        if (!result || result === null) {
          return;
        }
        if (!result.success) return;
        dispatch({
          type: `${NAMESPACE}/updateCoverageListWhenHitSustainabilityChecking`,
          payload: {
            coverageList: result.resultData.coverageList,
          },
        });
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    },
    [coverageList, dispatch]
  );
};
