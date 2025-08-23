import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const activityHistoryPanel = lodash
    .chain(action)
    .get('payload.activityHistoryPanel', [])
    .filter((item) => !!item)
    .value();
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'activityHistoryPanel', activityHistoryPanel);
  });
  return {
    ...nextState,
  };
};
