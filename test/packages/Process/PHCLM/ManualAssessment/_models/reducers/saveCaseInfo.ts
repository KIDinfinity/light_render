import { produce } from 'immer';

export default (state: any, action: any) => {
  const { caseInfo } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.caseInfo = caseInfo;
  });

  return { ...nextState };
};
