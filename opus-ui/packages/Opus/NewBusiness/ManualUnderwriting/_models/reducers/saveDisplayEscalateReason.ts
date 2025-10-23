import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const displayEscalateReason = lodash.get(action, 'payload.displayEscalateReason', false);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'displayEscalateReason', displayEscalateReason);
  });
  return {
    ...nextState,
  };
};
