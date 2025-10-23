import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const defaultKey = lodash.get(action, 'payload.defaultKey', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.defaultKey = defaultKey;
  });
  return {
    ...nextState,
  };
};
