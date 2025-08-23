export default (state, action) => {
  const {
    payload: { currentTab },
  } = action;

  return {
    ...state,
    currentTab,
    chatWindowVisible: false,
  };
};
