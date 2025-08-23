import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const defaultCategory = lodash.get(action, 'payload.activityCode', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.defaultCategory = defaultCategory;
  });
  return {
    ...nextState,
  };
};
