export default (state, action) => {
  const {
    payload: { sessionId },
  } = action;

  return {
    ...state,
    sessionId,
  };
};
