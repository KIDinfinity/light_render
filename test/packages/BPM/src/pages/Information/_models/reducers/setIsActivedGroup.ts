import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const isSelectedCategory = lodash.get(action, 'payload.isSelectedCategory');
  const nextState = produce(state, (draftState: any) => {
    draftState.isSelectedCategory = isSelectedCategory;
  });
  return {
    ...nextState,
  };
};
