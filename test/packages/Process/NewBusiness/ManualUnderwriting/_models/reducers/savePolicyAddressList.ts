import { produce } from 'immer';

export default (state: any, action: any) => {
  const { policyAddressList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.policyAddressList = policyAddressList;
  });
  return {
    ...nextState,
  };
};
