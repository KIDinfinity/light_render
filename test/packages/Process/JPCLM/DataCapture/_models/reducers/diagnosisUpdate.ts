/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import links from '../links';

export default (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      links.diagnosis_criticalIllness({ draftState, changedFields, diagnosisId });
    }
    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...draftState.claimEntities.diagnosisListMap[diagnosisId],
      ...changedFields,
    };
  });
  return { ...nextState };
};
