import { produce } from 'immer';

export default (state: any, action: any) => {
  const { chequeInfoList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.chequeInfoList = chequeInfoList;
  });
  return {
    ...nextState,
  };
};
