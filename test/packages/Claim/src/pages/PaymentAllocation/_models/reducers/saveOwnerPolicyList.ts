import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { policyList, clientId } = payload;
    lodash.set(draft.ownerPolicyMap, clientId, policyList);
  });
};
