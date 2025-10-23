import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const listenTaskIdList = lodash.get(action, 'payload.listenTaskIdList', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.listenTaskIdList = listenTaskIdList;
  });
  return {
    ...nextState,
  };
};
