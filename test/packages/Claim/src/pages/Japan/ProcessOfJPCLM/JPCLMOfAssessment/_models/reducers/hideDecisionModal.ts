import { produce } from 'immer';
import { forEach, isEmpty } from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

const hideDecisionModal = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData, claimEntities } = draftState;
    const { claimPayableList } = claimProcessData;
    const { claimPayableListMap, treatmentPayableListMap } = claimEntities;
    draftState.decisionModalShowStatus = false;
    forEach(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimPayableListMap[claimPayableItemId];
      claimPayableItem.claimDecision = ClaimDecision.deny;
      claimPayableItem.systemCalculationAmount = 0;
      claimPayableItem.assessorOverrideAmount = null;
      claimPayableItem.payableAmount = 0;
      if (!isEmpty(claimPayableItem.lifePayable)) {
        claimPayableItem.lifePayable.amountType = '';
        claimPayableItem.lifePayable.calculationAmount = null;
        claimPayableItem.lifePayable.reimbursementMultiple = null;
        claimPayableItem.lifePayable.assessorOverrideMultiple = null;
        claimPayableItem.lifePayable.payableAmount = 0;
      }
      const { treatmentPayableList } = claimPayableItem;
      forEach(treatmentPayableList, (treatmentItemId) => {
        const treatmentPayableItem = treatmentPayableListMap[treatmentItemId];
        treatmentPayableItem.systemCalculationAmount = 0;
        treatmentPayableItem.assessorOverrideAmount = null;
        treatmentPayableItem.systemPayableDays = null;
        treatmentPayableItem.assessorOverrideDays = null;
        treatmentPayableItem.reimbursementMultiple = null;
        treatmentPayableItem.assessorOverrideMultiple = null;
        treatmentPayableItem.systemDeductibleAmount = null;
        treatmentPayableItem.assessorOverrideDeductible = null;
        treatmentPayableItem.assessorOverridePercentage = null;
        treatmentPayableItem.deductibleAmount = null;
        treatmentPayableItem.payableAmount = 0;
        claimEntities.treatmentPayableListMap[treatmentItemId] = treatmentPayableItem;
      });
      claimEntities.claimPayableListMap[claimPayableItemId] = claimPayableItem;
    });
  });
  return { ...nextState };
};

export default hideDecisionModal;
