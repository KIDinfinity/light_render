import { produce } from 'immer';

const clearAssessmentRemark = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimDecision.assessmentRemark = null;
    draftState.claimProcessData.claimDecision.assessmentRemarkTemplate = undefined;
  });

  return { ...nextState };
};

export default clearAssessmentRemark;
