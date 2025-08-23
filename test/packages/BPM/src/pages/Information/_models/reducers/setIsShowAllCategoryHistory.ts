import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const isShowAllCategory = lodash.get(action, 'payload.isShowAllCategory');
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowAllCategory = isShowAllCategory;
  });
  return {
    ...nextState,
  };
};
