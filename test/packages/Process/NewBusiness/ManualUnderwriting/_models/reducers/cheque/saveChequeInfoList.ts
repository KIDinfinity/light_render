import { produce } from 'immer';

export default (state: any, action: any) => {
  const { chequeInfoList } = action.payload;

  console.log('sssss', chequeInfoList);
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.chequeInfoList = chequeInfoList;
    draftState.processData.chequeInfoList = chequeInfoList;
  });
  return {
    ...nextState,
  };
};
