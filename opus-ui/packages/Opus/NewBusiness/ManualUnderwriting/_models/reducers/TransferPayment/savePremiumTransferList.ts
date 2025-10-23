import { produce } from 'immer';

export default (state: any, action: any) => {
  const { premiumTransferList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData = {
      premiumTransferList,
    };
  });
  return {
    ...nextState,
  };
};
