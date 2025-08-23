import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.allAddressSubList = action.payload.allAddressSubList;
  });
  return {
    ...nextState,
  };
};
