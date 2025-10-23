export default (state: any, action: any) => {
  const { buttonStatus } = state;
  const { buttonCode } = action.payload;
  if(state.buttonStatus[buttonCode]) {
    state.buttonStatus[buttonCode].status = 'default';
    state.buttonStatus[buttonCode].errorsCount = 0;
  } else {
    state.buttonStatus[buttonCode] = {
      status: 'default',
      errorsCount: 0,
    }
  }
  return state
};
