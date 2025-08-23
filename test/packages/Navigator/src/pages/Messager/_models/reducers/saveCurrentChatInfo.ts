export default (state, action) => {
  const {
    payload: { currentChatInfo },
  } = action;

  return {
    ...state,
    currentChatInfo,
  };
};
