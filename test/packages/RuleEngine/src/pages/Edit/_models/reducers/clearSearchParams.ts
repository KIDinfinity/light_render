import { produce }  from 'immer';

const clearSearchParams = (state: any, action: any) => {
  const { activeCode } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data[activeCode].selectedRowKeys = [];
  });

  return { ...nextState };
};

export default clearSearchParams;
