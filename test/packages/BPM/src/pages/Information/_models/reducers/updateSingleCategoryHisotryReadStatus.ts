import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { id, newReadStatus } = action.payload;
  const list = state.historyList;
  const newList = lodash.map(list, (item: any) => {
    if (item.id === id) {
      return {
        ...item,
        readStatus: newReadStatus,
      };
    }
    return item;
  });

  const nextState = produce(state, (draftState: any) => {
    draftState.historyList = newList;
  });
  return {
    ...nextState,
  };
};
