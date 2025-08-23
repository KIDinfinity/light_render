import { produce }  from 'immer';

const saveSearchModelSelected = (state: any, action: any) => {
  const { selectedRowKeys } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { activeCode, data } = draftState.searchData;
    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data = {
      ...data,
      [activeCode]: {
        ...data[activeCode],
        selectedRowKeys,
      },
    };
  });

  return { ...nextState };
};

export default saveSearchModelSelected;
