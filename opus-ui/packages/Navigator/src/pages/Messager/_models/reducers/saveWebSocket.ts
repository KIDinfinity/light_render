export default (state, action) => {
  const { payload: webSocket } = action;

  return {
    ...state,
    webSocket,
  };
};
