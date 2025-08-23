import { produce } from 'immer';
import lodash from 'lodash';

const removeInvoicePayableItem = (state: any, action: any) => {
  const {
    treatmentPayableItemId,
    invoicePayableItemId,
    benefitItemPayableList = [],
  } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const servicePayableIdList =
      draftState.claimEntities.invoicePayableListMap[invoicePayableItemId]?.serviceItemPayableList;
    draftState.claimEntities.treatmentPayableListMap[
      treatmentPayableItemId
    ].invoicePayableList = lodash.filter(
      draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId]?.invoicePayableList,
      (itemId) => itemId !== invoicePayableItemId
    );
    benefitItemPayableList.forEach((id: any) => {
      delete draftState.claimEntities.benefitItemPayableListMap[id];
    });

    delete draftState.claimEntities.invoicePayableListMap[invoicePayableItemId];
    lodash.map(servicePayableIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemPayableListMap[itemId];
    });
  });

  return { ...nextState };
};

export default removeInvoicePayableItem;
