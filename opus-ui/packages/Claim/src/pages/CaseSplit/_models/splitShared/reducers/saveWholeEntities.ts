import { produce } from 'immer';

export default (state: any, { payload: { wholeEntities } }: any) => {
  return produce(state, (draft: any) => {
    draft.wholeEntities = wholeEntities;
  });
};
