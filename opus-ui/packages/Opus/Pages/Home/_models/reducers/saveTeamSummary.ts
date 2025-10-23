import { produce } from 'immer';

export default (state: any, action: any) => {
  const { teamSummary } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.teamSummary = teamSummary;
  });
  return { ...nextState };
};
