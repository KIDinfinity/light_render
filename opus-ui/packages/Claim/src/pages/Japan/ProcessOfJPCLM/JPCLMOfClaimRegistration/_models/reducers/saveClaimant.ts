import { produce } from 'immer';

const saveClaimant = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimant = {
      ...draftState.claimProcessData.claimant,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveClaimant;
