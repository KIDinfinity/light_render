import { produce } from 'immer';

const saveInvoicePayableItem = (state: any, action: any) => {
  const { changedFields, invoicePayableItemId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.invoicePayableListMap[invoicePayableItemId] = {
      ...draftState.claimEntities.invoicePayableListMap[invoicePayableItemId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveInvoicePayableItem;
