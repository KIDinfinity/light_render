export default (state, action) => {
  const { currentChatMessages: orginCurrentChatMessages } = state;
  const {
    payload: { currentChatMessages },
  } = action;

  return {
    ...state,
    currentChatMessages: currentChatMessages.concat(orginCurrentChatMessages),
    currentChatMessagesIsUpdateNew: false,
  };
};
