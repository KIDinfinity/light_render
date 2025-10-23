export default (state: any, action: any) => {
  const { currentMode: prevMode } = state;

  const {
    payload: { modeList, currentMode },
  } = action;

  return {
    ...state,
    modeList,
    currentMode,
    prevMode,
  };
};
