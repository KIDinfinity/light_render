export default (state, action) => {
  const {
    payload: {
      isShowContact,
      isShowChatHist,
      isShowChatHistList,
      isShowChatSingleHistList,
      isShowHistMore,
      goFirst,
      params,
      showListNum,
      goBackHist,
    },
  } = action;

  return {
    ...state,
    searchShowComp: {
      ...state.searchShowComp,
      isShowContact,
      isShowChatHist,
      isShowChatHistList,
      isShowChatSingleHistList,
      isShowHistMore,
      goFirst,
      params,
      showListNum,
      goBackHist,
    },
  };
};
