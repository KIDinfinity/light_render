import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { exchangeRate, fromCurrency } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `exchangeRate.${fromCurrency}`, exchangeRate);
  });
  return {
    ...nextState,
  };
};
