import { produce }  from 'immer';

const savesearchDataQuery = (state: any, action: any) => {
  const { activeCode, data } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { params, selectedRowKeys } = draftState.searchData.data[activeCode];

    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data[activeCode] = {
      params,
      pagination: {
        current: data.currentPage,
        currentPage: data.currentPage,
        total: data.total,
        pageSize: data.pageSize,
        totalPage: data.totalPage,
      },
      list: data.rows,
      selectedRowKeys,
    };
  });
  return { ...nextState };
};
export default savesearchDataQuery;
