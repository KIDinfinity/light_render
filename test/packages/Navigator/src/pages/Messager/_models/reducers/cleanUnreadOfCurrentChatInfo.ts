export default (state) => {
  const { currentChatInfo } = state;

  return {
    ...state,
    currentChatInfo: {
      ...currentChatInfo,
      unread: 0,
    },
  };
};
