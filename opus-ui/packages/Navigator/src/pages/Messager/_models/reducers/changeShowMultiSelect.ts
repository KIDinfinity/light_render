export default (state, action) => {
  const {
    payload: { showMultiSelect },
  } = action;

  return {
    ...state,
    showMultiSelect,
  };
};
