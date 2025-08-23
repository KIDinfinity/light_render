import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const triggerPointCode = lodash.get(action, 'payload.triggerPointCode', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.triggerPointCode = triggerPointCode;
  });
  return {
    ...nextState,
  };
};
