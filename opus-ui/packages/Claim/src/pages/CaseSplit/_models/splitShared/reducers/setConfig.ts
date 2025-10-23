import { produce } from 'immer';

export default (state: any, { payload: { config } }: any) => {
  return produce(state, (draft: any) => {
    draft.config = config;
  });
};
