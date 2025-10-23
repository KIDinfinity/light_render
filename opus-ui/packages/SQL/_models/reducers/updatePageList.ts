import { has } from 'lodash';
import { produce } from 'immer';

const savePageList = (state: any, { payload }: any) => {
  const { id, uploadSlice, loading } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.pageList = draftState.pageList.map((el: any) => {
      if (el.id === id) {
        return {
          ...el,
          uploadSlice: has(payload, 'uploadSlice') ? uploadSlice : el.uploadSlice,
          loading: has(payload, 'loading') ? loading : el.loading,
        }
      }
      return el
    });
  });
  return nextState;
};


export default savePageList
