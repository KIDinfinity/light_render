import { produce }  from 'immer';

const saveSearchPagination = (state: any, action: any) => {
  const { current, activeCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data[activeCode].pagination = {
      ...draftState.searchData.data[activeCode].pagination,
      current,
      currentPage: current,
    };
  });
  return { ...nextState };
};

export default saveSearchPagination;
