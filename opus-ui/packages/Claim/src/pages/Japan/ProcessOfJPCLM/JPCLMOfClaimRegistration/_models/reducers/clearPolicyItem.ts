import { produce } from 'immer';
import lodash from 'lodash';

const clearPolicyItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'claimProcessData.policyList', []);
    lodash.set(draftState, 'claimEntities.policyListMap', {});
  });
  return { ...nextState };
};

export default clearPolicyItem;
