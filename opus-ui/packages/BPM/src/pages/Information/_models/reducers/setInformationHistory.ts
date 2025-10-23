import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const historyList = lodash.get(action, 'payload.historyList', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.historyList = historyList;
  });
  return {
    ...nextState,
  };
};
