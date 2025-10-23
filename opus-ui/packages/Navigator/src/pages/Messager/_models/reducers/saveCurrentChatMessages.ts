export default (state, action) => {
  const {
    payload: { currentChatMessages },
  } = action;

  return {
    ...state,
    currentChatMessages,
    currentChatMessagesIsUpdateNew: true,
  };
};
