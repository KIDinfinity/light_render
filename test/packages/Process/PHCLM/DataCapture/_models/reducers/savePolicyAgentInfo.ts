import { produce }  from 'immer';
import lodash from 'lodash';

const savePolicyAgentInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    let agentTemp = {
      ...state.claimProcessData.policyAgent,
      ...finalChangedFields,
    };
    if (lodash.size(changedFields) > 1) {
      draftState.claimProcessData.policyAgent = agentTemp;
      return;
    }
    if (lodash.has(changedFields, 'agentNumber')) {
      draftState.claimProcessData.checkNumberRefresh = false;
      agentTemp = { agentNumber: changedFields.agentNumber.value };
    }
    draftState.claimProcessData.policyAgent = agentTemp;
  });

  return { ...nextState };
};

export default savePolicyAgentInfo;
