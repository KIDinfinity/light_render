import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const callBackList = lodash.get(action, 'payload.callBackList', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.callBackList = callBackList;
  });
  return {
    ...nextState,
  };
};
