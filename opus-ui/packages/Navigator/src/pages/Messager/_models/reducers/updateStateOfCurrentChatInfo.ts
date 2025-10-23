export default (state, action) => {
  const { currentChatInfo } = state;
  const {
    payload: { ustate },
  } = action;

  return {
    ...state,
    currentChatInfo: {
      ...currentChatInfo,
      ustate,
    },
  };
};
