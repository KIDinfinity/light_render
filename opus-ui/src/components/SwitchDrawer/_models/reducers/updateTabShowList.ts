import { produce } from 'immer';

const updateTabShowList = (state: any, action: any) => {
  const { displayItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.processShow = {
      ...draftState.processShow,
      isShowRemark: displayItem.information === 0 || false,
      isShowPending: displayItem.envoy === 0 || false,
      isShow360: displayItem.insured === 0 || false,
    };
    // eslint-disable-next-line no-param-reassign
    draftState.processInfo = {
      caseCategory: displayItem.caseCategory,
      currentActivityKey: displayItem.currentActivityKey,
    };
  });
  return { ...nextState };
};

export default updateTabShowList;
