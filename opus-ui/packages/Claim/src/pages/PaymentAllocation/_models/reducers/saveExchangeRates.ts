import { produce } from 'immer';

export default (state: any, action: any) => {
  const { exchangeRateList } = action.payload;
  return produce(state, (draftState: any) => {
    const draft = draftState;
    draft.exchangeRateList = exchangeRateList;
  });
};
