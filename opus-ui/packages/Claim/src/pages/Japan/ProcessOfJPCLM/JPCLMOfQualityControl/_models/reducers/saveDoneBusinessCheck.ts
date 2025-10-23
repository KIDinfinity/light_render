import { produce } from 'immer';

export default (state: any, action: any) => {
  const { doneBusinessCheck } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.doneBusinessCheck = doneBusinessCheck;
  });

  return { ...nextState };
};
