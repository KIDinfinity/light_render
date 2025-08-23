import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: Object) => {
  const claimProcessData = lodash.get(action, 'payload.claimProcessData');
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = claimProcessData;
  });
  return {
    ...nextState,
  };
};
