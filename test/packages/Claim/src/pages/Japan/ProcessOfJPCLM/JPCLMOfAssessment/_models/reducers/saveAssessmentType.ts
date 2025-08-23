import { produce } from 'immer';

const saveAssessmentType = (state: any, action: any) => {
  const { assessmentType } = action?.payload?.changedFields;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.assessmentType = assessmentType;
  });
  return { ...nextState };
};

export default saveAssessmentType;
