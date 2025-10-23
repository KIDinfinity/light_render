import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const allCategoryList = lodash.get(action, 'payload.allCategoryList', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.allCategoryList = allCategoryList;
  });
  return {
    ...nextState,
  };
};
