import { produce } from 'immer';

export default (state: any, action: any) => {
  const { chequeEditStatus } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.chequeEditStatus = chequeEditStatus;
  });
  return {
    ...nextState,
  };
};
