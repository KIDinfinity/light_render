export default (state, action) => {
  const {
    payload: { showSearchVisible },
  } = action;

  return {
    ...state,
    showSearchVisible,
  };
};
