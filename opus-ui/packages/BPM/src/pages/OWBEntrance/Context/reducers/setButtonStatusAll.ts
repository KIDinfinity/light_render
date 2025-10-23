export default (state: any, action: any) => {
  const { buttonStatus } = action.payload;
  state.buttonStatus = buttonStatus;
  return state;
};
