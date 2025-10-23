import { produce } from 'immer';

export default (state: any, action: any) => {
  const { show } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.showTransferPayment = show;
  });
  return {
    ...nextState,
  };
};
