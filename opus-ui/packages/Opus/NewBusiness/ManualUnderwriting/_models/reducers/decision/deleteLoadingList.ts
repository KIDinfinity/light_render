import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  return produce(state, draftState => {
    for (const coverageItem of draftState.processData.coverageList) {
      coverageItem.coverageLoadingList =
        coverageItem.coverageLoadingList?.filter((item) => item.id !== id && item.copyId !== id) ||
        [];
    }
  })

};
