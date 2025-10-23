export default (state, action) => {
  const {
    payload: { keyword, showSeachBox },
  } = action;

  return {
    ...state,
    keyword,
    showSeachBox,
  };
};
