import { produce }  from 'immer';

const saveClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData } = action.payload;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData = {
      ...claimProcessData,
      type: claimProcessData?.type || 'NewRequest',
    };
  });
  return { ...nextState };
};

export default saveClaimProcessData;
