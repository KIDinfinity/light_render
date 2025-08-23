import lodash from 'lodash'

export default (state: any) => {
  const buttonData = {
    status: 'default',
    errorsCount: 0,
  };
  if(!lodash.isEqual(state.buttonStatus?.submit, buttonData)) {
    state.buttonStatus.submit = buttonData
  }
  return state;
};
