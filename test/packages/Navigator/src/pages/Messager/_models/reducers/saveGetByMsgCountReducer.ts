export default (state, action) => {
  const {
    payload: { getByMsgCount },
  } = action;

  return {
    ...state,
    getByMsgCount,
  };
};
