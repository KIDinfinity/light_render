export default (state, action) => {
  const {
    payload: { showContextMenu },
  } = action;

  return {
    ...state,
    showContextMenu,
  };
};
