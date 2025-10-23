import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const taskStatus = lodash.get(action, 'payload.taskStatus', '');

  const nextState = produce(state, (draftState: any) => {
    draftState.taskStatus = taskStatus;
  });
  return {
    ...nextState,
  };
};
