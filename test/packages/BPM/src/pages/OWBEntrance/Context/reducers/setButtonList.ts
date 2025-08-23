import { shallowEqual } from 'react-redux';

export default (state: any, action: any) => {
  const { buttonList } = action.payload;
  if (!shallowEqual(buttonList, state.buttonList)) state.buttonList = buttonList;
  return state;
};
