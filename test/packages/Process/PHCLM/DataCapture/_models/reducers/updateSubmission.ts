import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };

    draftState.claimProcessData = claimProcessData;
  });
  return { ...nextState };
};
