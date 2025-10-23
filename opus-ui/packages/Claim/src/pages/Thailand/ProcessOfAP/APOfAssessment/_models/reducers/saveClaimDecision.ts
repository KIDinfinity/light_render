import { produce } from 'immer';
import { ClaimDecision } from 'claim/pages/utils/claim';
import lodash from 'lodash';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const claimPayableListMap = draftState.claimEntities?.claimPayableListMap;
    const fieldsArray = Object.entries(changedFields);
    const [name, { value }] = fieldsArray[0];
    if (fieldsArray.length === 1) {
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
