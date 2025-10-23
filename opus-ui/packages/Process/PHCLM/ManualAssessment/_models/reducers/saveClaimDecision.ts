import { produce } from 'immer';
import lodash from 'lodash';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'skipIntegration'))
      draftState.claimProcessData.skipIntegration = changedFields.skipIntegration;

    draftState.claimProcessData.claimDecision = {
      ...(draftState.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveClaimDecision;
