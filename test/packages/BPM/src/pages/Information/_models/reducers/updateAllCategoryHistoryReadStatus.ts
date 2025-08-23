import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { id, newReadStatus } = action.payload;
  const { allCategoryHistory } = state;
  const newList = lodash.map(allCategoryHistory, (singleCategory) => {
    return {
      ...singleCategory,
      informationList: lodash.map(singleCategory?.informationList, (informationListItem) => {
        return {
          ...informationListItem,
          informationDOList: lodash.map(informationListItem?.informationDOList, (item) => {
            if (item.id === id) {
              return {
                ...item,
                readStatus: newReadStatus,
              };
            }
            return item;
          }),
        };
      }),
    };
  });
  const nextState = produce(state, (draftState: any) => {
    draftState.allCategoryHistory = newList;
  });
  return {
    ...nextState,
  };
};
