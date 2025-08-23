import { produce }  from 'immer';

const saveExchangeRateForInvoice = (state: any, action: any) => {
    const { exchangeRateListForInvoiceCurrencyPayout } = action.payload;
    const nextState = produce(state, (draftState: any) => {
        draftState.exchangeRateListForInvoiceCurrencyPayout = exchangeRateListForInvoiceCurrencyPayout;
    });
    return { ...nextState };
};

export default saveExchangeRateForInvoice;
