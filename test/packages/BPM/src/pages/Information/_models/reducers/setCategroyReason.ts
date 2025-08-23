import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const categroyReason = lodash.get(action, 'payload.categroyReason');
  const nextState = produce(state, (draftState: any) => {
    draftState.categroyReason = categroyReason;
  });
  return {
    ...nextState,
  };
};
