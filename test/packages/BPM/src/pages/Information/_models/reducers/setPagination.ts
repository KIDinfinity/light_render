import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { pagination } = state;
  const { currentPage, totalPage } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.pagination = {
      ...pagination,
      currentPage,
      hasMore: totalPage >= currentPage,
    };
  });
  return {
    ...nextState,
  };
};
