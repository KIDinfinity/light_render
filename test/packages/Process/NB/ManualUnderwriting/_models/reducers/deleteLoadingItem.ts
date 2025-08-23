import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { loadingItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const addingLoadingItems = lodash.get(draftState, 'addingLoadingItems');
    lodash.set(
      draftState,
      `addingLoadingItems`,
      lodash.filter(addingLoadingItems, (item) => item.id !== loadingItemId)
    );
  });
  return { ...nextState };
};
