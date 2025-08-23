import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const listenList = lodash.get(action, 'payload.listenList', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.listenList = listenList;
  });
  return {
    ...nextState,
  };
};
