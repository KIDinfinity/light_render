import { produce } from 'immer';

export default (state: any, { payload: { seriesNoOrigin } }: any) => {
  return produce(state, (draft: any) => {
    draft.seriesNoOrigin = seriesNoOrigin;
  });
};
