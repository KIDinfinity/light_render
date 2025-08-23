import lodash from 'lodash'
export default (state: any, action: any) => {
  const { buttonStatus } = state;
  const { buttonCode, status } = action.payload;
  const buttonData = {
    status: status || 'default',
    errorsCount: buttonStatus?.[buttonCode]?.errorsCount || 0,
  };
  if(!lodash.isEqual(buttonData, state.buttonStatus[buttonCode]))
    state.buttonStatus[buttonCode] = buttonData;

  return state;
};
