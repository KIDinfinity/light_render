import { produce }  from 'immer';

const updateLATrack = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const newLATrack = draftState.claimProcessData.posDataDetail.laUpdateTrack;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.laUpdateTrack = {
      ...newLATrack,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updateLATrack;
