import { produce } from 'immer';

const showDrugsDetailList = (state: any, action: any) => {
  const { show, month, id, currentCodeBeforeOpenModal } = action.payload;

  const newState = produce(state, (draftState: any) => {
    draftState.DrugsDetail.show = show;
    draftState.DrugsDetail.month = month;
    draftState.DrugsDetail.id = id;
    draftState.DrugsDetail.currentCodeBeforeOpenModal = currentCodeBeforeOpenModal;
  });
  return { ...newState };
};

export default showDrugsDetailList;
