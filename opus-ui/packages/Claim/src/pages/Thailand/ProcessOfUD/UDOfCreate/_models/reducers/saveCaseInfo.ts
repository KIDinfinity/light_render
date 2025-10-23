import { produce } from 'immer';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      processParam: {
        ...changedFields,
      },
    };
  });
  return { ...nextState };
};
