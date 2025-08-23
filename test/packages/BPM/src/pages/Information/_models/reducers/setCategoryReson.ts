import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const categoryReason = lodash.get(action, 'payload.categoryReason');
  const nextState = produce(state, (draftState: any) => {
    draftState.ownCategoryReason = categoryReason;
  });
  return {
    ...nextState,
  };
};
