import { produce } from 'immer';
import { ClaimDecision } from 'claim/pages/utils/claim';
import lodash from 'lodash';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const claimPayableListMap = draftState.claimEntities?.claimPayableListMap;
    const fieldsArray = Object.entries(changedFields);
    draftState.claimProcessData.claimDecision = {
      ...(state.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      if (name === 'assessmentDecision') {
        if (value === ClaimDecision.deny) {
          if (!lodash.isEmpty(claimPayableListMap)) {
            draftState.decisionModalShowStatus = true;
          }
        }
      }
    }

    draftState.claimProcessData.claimDecision = {
      ...(draftState.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveClaimDecision;
