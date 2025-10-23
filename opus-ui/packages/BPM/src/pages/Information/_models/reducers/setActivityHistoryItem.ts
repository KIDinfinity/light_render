import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { activityHistoryItem } = lodash.pick(action?.payload, ['activityHistoryItem']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'activityHistoryItem', activityHistoryItem);
  });
  return {
    ...nextState,
  };
};
