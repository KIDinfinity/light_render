export default (state, action) => {
  const {
    payload: { chatStatus },
  } = action;

  return {
    ...state,
    chatStatus,
  };
};
