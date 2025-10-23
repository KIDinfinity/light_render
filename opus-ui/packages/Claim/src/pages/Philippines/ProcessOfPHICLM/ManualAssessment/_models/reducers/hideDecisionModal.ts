import { produce } from 'immer';
import { forEach, isEmpty } from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

const hideDecisionModal = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
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
      claimPayableItem.denyCode = null;
      claimPayableItem.denyWithRescission = null;
      claimPayableItem.refundBasis = null;
      claimPayableItem.claimWithExGratia = null;
      if (!isEmpty(claimPayableItem.lifePayable)) {
        claimPayableItem.lifePayable.payableAmount = 0;
      }
      const { treatmentPayableList } = claimPayableItem;
      forEach(treatmentPayableList, (treatmentItemId) => {
        const treatmentPayableItem = treatmentPayableListMap[treatmentItemId];
        treatmentPayableItem.systemCalculationAmount = 0;
        treatmentPayableItem.assessorOverrideAmount = null;
        treatmentPayableItem.payableAmount = 0;
        treatmentPayableItem.payableDays = null;
        claimEntities.treatmentPayableListMap[treatmentItemId] = treatmentPayableItem;

        const { invoicePayableList } = treatmentPayableItem;

        forEach(invoicePayableList, (invoicePayableId) => {
          const invoicePayableItem = claimEntities.invoicePayableListMap[invoicePayableId];
          invoicePayableItem.systemCalculationAmount = 0;
          invoicePayableItem.assessorOverrideAmount = null;
          invoicePayableItem.payableAmount = 0;
          claimEntities.invoicePayableListMap[invoicePayableId] = invoicePayableItem;

          const { benefitItemPayableList } = invoicePayableItem;

          forEach(benefitItemPayableList, (benefitPayableItemId) => {
            const benefitPayableItem =
              claimEntities.benefitItemPayableListMap[benefitPayableItemId];
            benefitPayableItem.expenseAmount = 0;
            benefitPayableItem.assessorOverrideAmount = null;
            benefitPayableItem.payableAmount = 0;
          });
        });
      });
      claimEntities.claimPayableListMap[claimPayableItemId] = claimPayableItem;
    });
  });
  return { ...nextState };
};

export default hideDecisionModal;
