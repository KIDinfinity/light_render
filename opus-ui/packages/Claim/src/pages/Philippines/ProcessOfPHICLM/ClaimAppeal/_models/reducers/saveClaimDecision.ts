import { produce } from 'immer';
import { ClaimDecision } from 'claim/pages/utils/claim';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      if (name === 'assessmentDecision') {
        if (value === ClaimDecision.deny) {
          // draftState.decisionModalShowStatus = true;
        }
      }
    }

    draftState.claimProcessData.claimDecision = {
      ...(draft.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveClaimDecision;
