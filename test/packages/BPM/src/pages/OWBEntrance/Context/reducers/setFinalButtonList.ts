
import { shallowEqual } from 'react-redux';
export default (state: any, action: any) => {
  const { finalButtonList } = action.payload;
  if(!shallowEqual(finalButtonList, state.finalButtonList))
    state.finalButtonList = finalButtonList;
  return state;
};
