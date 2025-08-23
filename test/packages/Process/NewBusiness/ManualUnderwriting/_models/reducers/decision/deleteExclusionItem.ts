import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  return produce(state, (draftState: any) => {
    const addPopExclusionList = lodash.get(draftState, 'addPopExclusionList');
    lodash.set(
      draftState,
      `addPopExclusionList`,
      lodash.filter(addPopExclusionList, (item) => item.id !== id)
    );
  });
};
