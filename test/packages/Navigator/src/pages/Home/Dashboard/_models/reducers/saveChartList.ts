import { produce } from 'immer';

export default (state: any, action: any) => {
  const { chartList, hasMore } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartList = chartList;
    draftState.hasMore = hasMore;
  });
  return { ...nextState };
};
