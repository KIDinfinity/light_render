export default (state, action) => {
  const { currentChatMessages: orginCurrentChatMessages } = state;
  const {
    payload: { chatMessage },
  } = action;

  return {
    ...state,
    currentChatMessages: orginCurrentChatMessages.concat(chatMessage),
    currentChatMessagesIsUpdateNew: true,
    currentSendingMessage: '',
  };
};
