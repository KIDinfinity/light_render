export default (state, action) => {
  const {
    payload: { loadingReconnect },
  } = action;

  return {
    ...state,
    loadingReconnect,
  };
};
