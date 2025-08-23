import { produce }  from 'immer';

const updateUwInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.uwInformation = {
      ...draftState.claimProcessData.posDataDetail.uwInformation,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default updateUwInfo;
