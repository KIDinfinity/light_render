import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const assignee = lodash.get(action, 'payload.assignee', '');

  const nextState = produce(state, (draftState: any) => {
    draftState.assignee = assignee;
  });

  return {
    ...nextState,
  };
};
