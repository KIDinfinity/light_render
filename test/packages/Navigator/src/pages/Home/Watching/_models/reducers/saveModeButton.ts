import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { mode },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.mode = mode;
  });

  return { ...nextState };
};
