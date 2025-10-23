import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const allCategoryHistory = lodash.get(action, 'payload.allCategoryHistory', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.allCategoryHistory = allCategoryHistory;
  });
  return {
    ...nextState,
  };
};
