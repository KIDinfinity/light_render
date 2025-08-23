import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { changedFields } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.changedFields = changedFields;
  });
  return { ...nextState };
};
