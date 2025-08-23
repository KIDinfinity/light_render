import lodash from 'lodash';
import { produce } from 'immer';

/**
 * @param {string} action.payload.taskId
 */
export default (state: any, action: Object) => {
  const taskId = lodash.get(action, 'payload.taskId', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.taskId = taskId;
  });
  return {
    ...nextState,
  };
};
