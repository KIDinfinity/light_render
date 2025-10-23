import { produce } from 'immer';

export default (state: any, action: any) => {
  const { paymentList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.paymentList = paymentList;
  });
  return {
    ...nextState,
  };
};
