export default (state) => {
  return {
    ...state,
    // sessionId: '',
    currentChatInfo: {},
    currentChatMessages: [],
    currentChatMessagesPagination: {
      currentPage: 0,
      pageSize: 20,
    },
    currentSendingMessage: '',
  };
};
