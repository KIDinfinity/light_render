import { produce }  from 'immer';

const saveInvoiceItem = (state: any, action: any) => {
  const { invoiceId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...state.claimEntities.invoiceListMap[invoiceId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveInvoiceItem;
