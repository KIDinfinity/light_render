import { produce } from 'immer';
import lodash from 'lodash';
import { updateClaimPolicyPayableFun } from '../functions';

export default (state, action) => {
  const { policyNo, changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    if (lodash.has(changedFields, 'ncdFlag')) {
      updateClaimPolicyPayableFun.updateNCDFlag(
        draftState,
        { policyNo, ncdFlag: changedFields.ncdFlag },
        { isOverride: true }
      );
    }
  });
};
