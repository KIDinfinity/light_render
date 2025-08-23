import { produce } from 'immer';
import lodash from 'lodash';

const removeInvoicePayableItem = (state: any, action: any) => {
  const { treatmentPayableItemId, invoicePayableItemId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const servicePayableIdList =
      draftState.claimEntities.invoicePayableListMap[invoicePayableItemId].serviceItemPayableList;
    draftState.claimEntities.treatmentPayableListMap[
      treatmentPayableItemId
    ].invoicePayableList = lodash.filter(
      draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId].invoicePayableList,
      (itemId) => itemId !== invoicePayableItemId
    );

    delete draftState.claimEntities.invoicePayableListMap[invoicePayableItemId];
    lodash.map(servicePayableIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemPayableListMap[itemId];
    });
  });

  return { ...nextState };
};

export default removeInvoicePayableItem;
