import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const id = lodash.get(action, 'payload.id');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'policyOwnerSelect', id);
  });
  return {
    ...nextState,
  };
};
