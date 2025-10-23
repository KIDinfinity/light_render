import { produce } from 'immer';

const removeInvoicePayableAddItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    draftState.invoicePayableAddItem = null;
  });

  return { ...nextState };
};

export default removeInvoicePayableAddItem;
