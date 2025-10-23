import { produce } from 'immer';

const saveNoPermissionCases = (state: any, action: any) => {
  const { caseNo, result } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.noPermissionCases[caseNo] = result;
  });
  return { ...nextState };
};

export default saveNoPermissionCases;
