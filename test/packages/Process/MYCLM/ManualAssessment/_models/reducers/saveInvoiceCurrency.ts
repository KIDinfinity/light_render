import { produce } from 'immer';

const saveInvoiceCurrency = (state: any, action: any) => {
  const { invoiceCurrencyObj } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.invoiceCurrencyObj = invoiceCurrencyObj;
  });

  return { ...nextState };
};

export default saveInvoiceCurrency;
