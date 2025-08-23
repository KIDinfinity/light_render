import { produce }  from 'immer';

const updateTrack = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const newUpdateTrack = draftState.claimProcessData?.businessData?.transactionTypes?.[0]?.updateTrack;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData.transactionTypes[0].updateTrack = {
      ...newUpdateTrack,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updateTrack;
