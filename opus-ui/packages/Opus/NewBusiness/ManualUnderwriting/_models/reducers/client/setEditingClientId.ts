import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientId = lodash.get(action, 'payload.clientId', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.editingClientId = clientId;
  });
  return {
    ...nextState,
  };
};
