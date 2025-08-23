import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { isShowNtuModal } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowNtuModal = isShowNtuModal;
  });
  return { ...nextState };
};
