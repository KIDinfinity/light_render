import { produce } from 'immer';

export default (state: any, action: any) => {
  const { selectedRowKeys = [] } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.searchResultRowKeys =
      selectedRowKeys && selectedRowKeys.length
        ? [selectedRowKeys[selectedRowKeys.length - 1]]
        : [];
  });

  return { ...nextState };
};
