import { produce } from 'immer';

const updateSearchParams = (state: any, action: any) => {
  const searchData = produce(state, (draftState: any) => {
    const { activeCode, data } = draftState.searchData;

    const params = data[activeCode]?.params || {};

    // eslint-disable-next-line no-param-reassign
    draftState.searchData.data[activeCode].params = {
      ...params,
      ...action.payload,
    };
  });
  return { ...searchData };
};
export default updateSearchParams;
