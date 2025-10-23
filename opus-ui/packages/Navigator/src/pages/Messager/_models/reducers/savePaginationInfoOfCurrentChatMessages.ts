export default (state, action) => {
  const {
    payload: { currentChatMessagesPagination },
  } = action;

  return {
    ...state,
    currentChatMessagesPagination,
  };
};
