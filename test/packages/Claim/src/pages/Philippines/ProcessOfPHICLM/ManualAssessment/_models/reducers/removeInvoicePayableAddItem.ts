import { produce } from 'immer';

const removeInvoicePayableAddItem = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.invoicePayableAddItem = null;
  });

  return { ...nextState };
};

export default removeInvoicePayableAddItem;
