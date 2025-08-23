import { produce } from 'immer';

const saveUploadLoading = (state: any, action: any) => {
  const { id, loading } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.pageList = draftState.pageList.map((el: any) => {
      if (el.id === id) {
        return {
          ...el,
          loading,
        }
      }
      return el
    });
  });
  return nextState;
};


export default saveUploadLoading
