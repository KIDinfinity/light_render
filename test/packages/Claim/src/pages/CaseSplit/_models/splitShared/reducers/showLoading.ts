import { produce } from 'immer';

export default (state: any, { payload: { loadingSplit } }: any) => {
  return produce(state, (draft: any) => {
    draft.loadingSplit = loadingSplit;
  });
};
