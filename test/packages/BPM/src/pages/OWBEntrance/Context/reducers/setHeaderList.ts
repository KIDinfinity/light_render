
import { shallowEqual } from 'react-redux';
export default (state: any, action: any) => {
  const { headerList } = action.payload;
  if(!shallowEqual(headerList, state.headerList))
    state.headerList = headerList;
  return state;
};
