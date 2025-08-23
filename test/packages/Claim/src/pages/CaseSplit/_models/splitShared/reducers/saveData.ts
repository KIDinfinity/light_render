import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  return produce(state, (draft: any) => {
    draft = { ...draft, ...payload };

    return draft;
  });
};
