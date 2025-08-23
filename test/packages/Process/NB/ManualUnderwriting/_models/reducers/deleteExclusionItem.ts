import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { exclusionItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const addPopExclusionList = lodash.get(draftState, 'addPopExclusionList');
    lodash.set(
      draftState,
      `addPopExclusionList`,
      lodash.filter(addPopExclusionList, (item) => item.id !== exclusionItemId)
    );
  });
  return { ...nextState };
};
