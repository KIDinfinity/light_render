import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const loading = lodash.get(action, 'payload.loading', false);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'loading', loading);
  });
  return nextState;
};
