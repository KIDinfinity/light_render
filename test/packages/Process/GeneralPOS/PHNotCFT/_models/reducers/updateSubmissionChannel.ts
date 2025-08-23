import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData = {
      ...draftState.claimProcessData.businessData,
      ...changedFields,
    };
  });
  return { ...nextState };
};
