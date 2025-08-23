import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const visible = lodash.get(action, 'payload.visible', false);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addLinkedPolicyModalVisible', visible);
    if (!visible) {
      lodash.set(draftState, 'policyNoList', []);
    }
  });
  return {
    ...nextState,
  };
};
