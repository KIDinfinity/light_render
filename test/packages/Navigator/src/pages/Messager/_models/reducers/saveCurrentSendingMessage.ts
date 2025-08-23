export default (state, action) => {
  const {
    payload: { currentSendingMessage },
  } = action;

  return {
    ...state,
    currentSendingMessage,
  };
};
