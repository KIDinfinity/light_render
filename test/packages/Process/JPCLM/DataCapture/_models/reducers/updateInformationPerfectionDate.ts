import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { changedFields, bpmSubmissionDate } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (bpmSubmissionDate) {
      draftState.claimProcessData = {
        ...draftState.claimProcessData,
        informationPerfectionDate: bpmSubmissionDate,
      };
    } else {
      draftState.claimProcessData = {
        ...draftState.claimProcessData,
        ...changedFields,
      };
    }
  });

  return { ...nextState };
};
