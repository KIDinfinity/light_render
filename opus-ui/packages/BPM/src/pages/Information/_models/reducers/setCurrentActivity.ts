import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const currentActivity = lodash.get(action, 'payload.currentActivity', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.currentActivity = currentActivity;
  });
  return {
    ...nextState,
  };
};
