import { produce } from 'immer';

const saveExchangeRateForInvoice = (state: any, action: any) => {
  const { exchangeRateListForInvoice } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.exchangeRateListForInvoice = exchangeRateListForInvoice;
  });
  return { ...nextState };
};

export default saveExchangeRateForInvoice;
