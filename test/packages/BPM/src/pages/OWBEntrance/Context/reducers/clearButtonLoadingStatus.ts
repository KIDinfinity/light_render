import lodash from 'lodash';

export default (state: any, action: any) => {
  const { buttonStatus } = state;
  const { buttonCode } = action.payload;
  if (lodash.get(buttonStatus, buttonCode)?.status === 'loading') {
    const buttonData = {
      status: 'default',
      errorsCount: buttonStatus[buttonCode]?.errorsCount || 0,
    }
    if(!lodash.isEqual(state.buttonStatus?.[buttonCode], buttonData)) {
      state.buttonStatus[buttonCode] = buttonData
    }
  }
  return state;
};
