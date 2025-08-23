import { produce } from 'immer';
export default (state: any, { payload }: any) => {
  const { changedFields } = payload;
  return produce(state, (draftState: any) => {
    draftState.escalte = {
      ...draftState.escalte,
      ...changedFields,
    };
  });
};
