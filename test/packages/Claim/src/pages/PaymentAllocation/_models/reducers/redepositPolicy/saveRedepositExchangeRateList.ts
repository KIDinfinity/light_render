import { produce } from 'immer';

export default (state: any, action: any) => {
  const { redepositExchangeRateList } = action.payload;
  return produce(state, (draftState: any) => {
    const draft = draftState;
    draft.redepositExchangeRateList = redepositExchangeRateList;
  });
};
