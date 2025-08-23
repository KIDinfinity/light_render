import { produce }  from 'immer';

const saveSerialClaimSearchParams = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaim.filterParams = {
      ...draftState.serialClaim.filterParams,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveSerialClaimSearchParams;
