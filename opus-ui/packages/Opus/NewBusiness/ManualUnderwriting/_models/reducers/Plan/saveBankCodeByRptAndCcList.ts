import { produce } from 'immer';

export default (state: any, action: any) => {
  const { bankCodeByRptAndCcList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.bankCodeByRptAndCcList = bankCodeByRptAndCcList;
  });
  return {
    ...nextState,
  };
};
