import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, coverageId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (
      lodash.has(changedFields, 'facultativePackageCode') ||
      lodash.has(changedFields, 'facultativeReason')
    ) {
      const ownCoverageList = lodash.get(draftState, 'processData.coverageList', []);
      const coverageIndex = ownCoverageList.findIndex((item: any) => item.id === coverageId);
      if (coverageIndex !== -1) {
        const coverageDecision = ownCoverageList[coverageIndex].coverageDecision;
        lodash.set(draftState, `processData.coverageList[${coverageIndex}].coverageDecision`, {
          ...coverageDecision,
          ...changedFields,
        });
      }
    }
  });
  return { ...nextState };
};
