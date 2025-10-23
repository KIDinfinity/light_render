import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.takeOver.takeOverFlag = draftState.processData.takeOver.takeOverFlag;
    draftState.modalData.takeOver.takeOverList = draftState.processData.takeOver.takeOverList;
  });
  return { ...nextState };
};
