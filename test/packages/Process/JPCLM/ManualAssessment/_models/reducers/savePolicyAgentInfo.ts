import { produce }  from 'immer';
import lodash from 'lodash';

const cleanField = [
  'agentName',
  'agentUnit',
  'agentPhone',
  'agentLocation',
  'agentStatus',
  'surname',
  'givenName',
];

const savePolicyAgentInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    const agentTemp = {
      ...state.claimProcessData.policyAgent,
      ...finalChangedFields,
    };
    if (lodash.size(changedFields) > 1) {
      draftState.claimProcessData.policyAgent = agentTemp;
      return;
    }
    if (lodash.has(changedFields, 'agentNumber')) {
      draftState.claimProcessData.checkNumberRefresh = false;
      lodash.forEach(cleanField, (key) => {
        agentTemp[key] = '';
      });
    }
    if (lodash.has(changedFields, 'informTheAgency')) {
      draftState.claimProcessData.informTheAgency = changedFields.informTheAgency.value;
    }
    draftState.claimProcessData.policyAgent = agentTemp;
  });

  return { ...nextState };
};

export default savePolicyAgentInfo;
