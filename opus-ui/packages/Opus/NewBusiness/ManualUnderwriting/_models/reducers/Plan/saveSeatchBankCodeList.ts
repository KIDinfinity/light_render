import { produce } from 'immer';

export default (state: any, action: any) => {
  const { searchBankCodeList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.searchBankCodeList = searchBankCodeList;
  });
  return {
    ...nextState,
  };
};
