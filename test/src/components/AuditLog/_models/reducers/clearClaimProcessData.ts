import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {};
  });
  return { ...nextState };
};
