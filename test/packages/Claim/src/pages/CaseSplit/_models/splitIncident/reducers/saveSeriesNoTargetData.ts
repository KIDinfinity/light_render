import { produce } from 'immer';

export default (state: any, { payload: { seriesNoTarget } }: any) => {
  return produce(state, (draft: any) => {
    draft.seriesNoTarget = seriesNoTarget;
  });
};
