import { produce } from 'immer';

export default (state: any) => {
  const newList =
    state?.modalData?.takeOver?.takeOverList?.filter((item: any) => !item?.isLast) || [];
  const nextState = produce(state, (draftState: any) => {
    draftState.processData.takeOver.takeOverFlag = draftState.modalData.takeOver.takeOverFlag;
    draftState.processData.takeOver.takeOverList = newList;
  });
  return { ...nextState };
};
