import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const selectedClientId = lodash.get(action, 'payload.selectedClientId');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'selectedClientId', selectedClientId);
  });
  return {
    ...nextState,
  };
};
