import { produce } from 'immer';

const clearReAssessmentBreakdownError = (state: any) => {
  return produce(state, (draftState: any) => {
    draftState.errorFlag = '';
  });
};

export default clearReAssessmentBreakdownError;
