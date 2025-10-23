import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const latestaskId = lodash.get(action, 'payload.latestaskId', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.latestaskId = latestaskId;
  });
  return {
    ...nextState,
  };
};
