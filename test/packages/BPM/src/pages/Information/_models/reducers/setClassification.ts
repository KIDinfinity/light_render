import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const classification = lodash.get(action, 'payload.classification', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.classification = classification;
  });
  return {
    ...nextState,
  };
};
