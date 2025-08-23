import lodash from 'lodash';
import { produce } from 'immer';

const removePolicyItem = (state: any, action: any) => {
  const { policyId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.policyList = lodash.filter(
      draftState.claimProcessData.policyList,
      (item) => item !== policyId
    );
    delete draftState.claimEntities.policyListMap[policyId];
  });

  return { ...nextState };
};

export default removePolicyItem;
