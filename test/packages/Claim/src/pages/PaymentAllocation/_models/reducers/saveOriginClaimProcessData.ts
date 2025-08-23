import { produce } from 'immer';

const saveOriginClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData } = action.payload;
    draftState.originClaimProcessData = claimProcessData;
  });
  return { ...nextState };
};

export default saveOriginClaimProcessData;
