import { produce } from 'immer';

const saveNoPermissionClaimNos = (state: any, action: any) => {
  const { claimNo, result } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.noPermissionClaimNos[claimNo] = result;
  });
  return { ...nextState };
};

export default saveNoPermissionClaimNos;
