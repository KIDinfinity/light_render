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
      claimPayableItem.exGratiaCode = null;
      claimPayableItem.exGratiaReason = null;
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

          const { serviceItemPayableList } = invoicePayableItem;

          forEach(serviceItemPayableList, (servicePayableItemId) => {
            const servicePayableItem =
              claimEntities.serviceItemPayableListMap[servicePayableItemId];
            servicePayableItem.systemCalculationAmount = 0;
            servicePayableItem.assessorOverrideAmount = null;
            servicePayableItem.payableAmount = 0;
            servicePayableItem.payableDays = null;
            servicePayableItem.deductibleAmount = null;
          });
        });
      });
      claimEntities.claimPayableListMap[claimPayableItemId] = claimPayableItem;
    });
  });
  return { ...nextState };
};

export default hideDecisionModal;
