export default (state, action) => {
  const {
    payload: { chatOffline },
  } = action;

  return {
    ...state,
    chatOffline,
    chatStatus: chatOffline ? 4 : 1,
  };
};
