import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { viewActived } = payload;
  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    draft.viewActived = viewActived;
  });
};
