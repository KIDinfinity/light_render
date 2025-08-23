import { produce } from 'immer';

export default (state: any, { payload: { showProcessLoading } }: any) => {
  return produce(state, (draft: any) => {
    draft.showProcessLoading = showProcessLoading;
  });
};
