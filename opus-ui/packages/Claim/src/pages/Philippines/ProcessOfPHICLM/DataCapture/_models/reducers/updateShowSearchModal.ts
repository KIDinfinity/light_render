import { produce } from 'immer';

const updateShowSearchModal = (state: any, action: any) => {
  const { showSearchModel } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.showSearchModel = showSearchModel;
    draftState.searchInsuredObj = {};
    draftState.claimProcessData.insuredList = [];
  });

  return { ...nextState };
};

export default updateShowSearchModal;
