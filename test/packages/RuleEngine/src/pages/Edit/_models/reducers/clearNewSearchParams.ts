import { produce }  from 'immer';

const clearNewSearchParams = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { activeCode } = draftState.searchData;
    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data[activeCode].params = {
      name: '',
      moduleCode: '',
      type: '',
      creator: '',
      createDate: '',
    };
  });

  return { ...nextState };
};

export default clearNewSearchParams;
