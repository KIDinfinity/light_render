import { produce } from 'immer';

const saveClaimData = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveClaimData;
