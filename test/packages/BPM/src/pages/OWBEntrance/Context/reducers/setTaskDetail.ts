import lodash from 'lodash';

import { shallowEqual } from 'react-redux';
export default (state: any, action: any) => {
  let { taskDetail } = action.payload;
  if(!lodash.isPlainObject(taskDetail))
    taskDetail = {}
  if(!shallowEqual(taskDetail, state.taskDetail))
    state.taskDetail = taskDetail
  return state;
};
