import { produce } from 'immer';

const saveInvoicePayableItem = (state: any, action: any) => {
  const { changedFields, invoicePayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const editPayableItem = {
      ...newClaimEntities.invoicePayableListMap[invoicePayableItemId],
      ...changedFields,
    };

    newClaimEntities.invoicePayableListMap[invoicePayableItemId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveInvoicePayableItem;
