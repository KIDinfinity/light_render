import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { code, list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.bankBranchByCodeMap = {
      ...draftState.bankBranchByCodeMap,
      [code]: list,
    };
  });
  return { ...nextState };
};
