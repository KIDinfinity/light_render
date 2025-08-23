import { produce }  from 'immer';

const hideCurrencyModal = (state: any,action: any) => {
  const { currencyModalShowStatus } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.currencyModalShowStatus = currencyModalShowStatus;
  });
  return { ...nextState };
};

export default hideCurrencyModal;
