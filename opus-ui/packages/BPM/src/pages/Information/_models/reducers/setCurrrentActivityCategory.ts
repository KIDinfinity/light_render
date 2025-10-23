import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const currrentActivityCategory = lodash.get(action, 'payload.currrentActivityCategory');
  const nextState = produce(state, (draftState: any) => {
    draftState.currrentActivityCategory = currrentActivityCategory;
  });
  return {
    ...nextState,
  };
};
