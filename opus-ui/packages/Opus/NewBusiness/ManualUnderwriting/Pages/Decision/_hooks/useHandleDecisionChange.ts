import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetOriginCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';
import PolicyLevelDecision from 'opus/NewBusiness/Enum/PolicyLevelDecision';

export default () => {
  const dispatch = useDispatch();
  const originCoverageList = useGetOriginCoverageList();

  return useCallback(
    ({ uwDecision }: { uwDecision: PolicyLevelDecision }) => {
      if (
        uwDecision === PolicyLevelDecision.Decline ||
        uwDecision === PolicyLevelDecision.Postpone
      ) {
        const newCoverageList = lodash
          .chain(originCoverageList)
          .map((coverage) => {
            const newCoverage = lodash.set(coverage, 'coverageDecision.uwDecision', uwDecision);
            return newCoverage;
          })
          .value();
        dispatch({
          type: `${NAMESPACE}/updateCoverageListWhenHitSustainabilityChecking`,
          payload: {
            coverageList: newCoverageList,
          },
        });
      }
      // decision 改变时，清空reason的选择
      dispatch({
        type: `${NAMESPACE}/setPolicySection`,
        payload: {
          changedFields: {
            reason: '',
            reasonName: '',
            reasonDescription: '',
          },
        },
      });
    },
    [originCoverageList]
  );
};
