import React from 'react';
import useGetOriginCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';
import lodash from 'lodash';
import { updateUWDecision } from '@/services/owbNbCoverageUWDecisionServices';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';

export default () => {
  const coverageList = useGetOriginCoverageList();
  const dispatch = useDispatch();
  const policyDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyDecision,
    shallowEqual
  );
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
        const result = await updateUWDecision({
          coverageList: formUtils.cleanValidateData(newCoverageList),
          policyDecision: formUtils.cleanValidateData(policyDecision),
        });
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
        const decisionCode = result?.resultData?.policyDecision?.decisionCode;
        dispatch({
          type: `${NAMESPACE}/setPolicySection`,
          payload: {
            changedFields: {
              decisionCode,
            },
          },
        });
        return;
      } catch (err) {
        return;
      }
    },
    [coverageList, dispatch]
  );
};
