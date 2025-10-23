export default (state: any, action: any) => {
  const {
    payload: { currentMode },
  } = action;

  return {
    ...state,
    currentMode,
  };
};
