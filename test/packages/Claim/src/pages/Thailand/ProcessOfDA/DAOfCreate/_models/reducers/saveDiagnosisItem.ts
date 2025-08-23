import { produce } from 'immer';

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.diagnosisListMap[diagnosisId] = {
      ...state.claimEntities.diagnosisListMap[diagnosisId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveDiagnosisItem;
