import { produce } from 'immer';

const saveExchangeRate = (state: any, action: any) => {
  const { exchangeRateList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.exchangeRateList = exchangeRateList;
  });
  return { ...nextState };
};

export default saveExchangeRate;
