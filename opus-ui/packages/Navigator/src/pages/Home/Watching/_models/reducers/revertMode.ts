export default (state: any, action: any) => {
  const { prevMode } = state;

  return {
    ...state,
    currentMode: prevMode,
  };
};
