import { produce } from 'immer';
import { isNumber } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';

const saveClaimDecision = (state, action) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const fieldsArray = Object.entries(changedFields);
    draftState.claimProcessData.claimDecision = {
      ...(state.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      const claimPayableAmount = formUtils.queryValue(
        draftState.claimProcessData.claimDecision.claimPayableAmount
      );
      const diagnosisFormAmount = formUtils.queryValue(
        draftState.claimProcessData.claimDecision.diagnosisFormAmount
      );
      if (isNumber(claimPayableAmount) || isNumber(diagnosisFormAmount)) {
        draftState.claimProcessData.claimDecision.totalPayableAmount =
          (claimPayableAmount || 0) + (diagnosisFormAmount || 0);
      } else {
        draftState.claimProcessData.claimDecision.totalPayableAmount = null;
      }
      if (name === 'assessmentDecision') {
        if (value === ClaimDecision.deny) {
          draftState.decisionModalShowStatus = true;
        }
      }
    }
  });
  return { ...nextState };
};

export default saveClaimDecision;
