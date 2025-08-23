import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const updatePolicyModalVisible = lodash.get(action, 'payload.updatePolicyModalVisible', false);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'updatePolicyModalVisible', updatePolicyModalVisible);
  });

  return {
    ...nextState,
  };
};
