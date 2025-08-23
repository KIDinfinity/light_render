export default (state, action) => {
  const {
    payload: { keyword },
  } = action;

  return {
    ...state,
    keyword,
  };
};
