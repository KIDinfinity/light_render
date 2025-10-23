import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const envoyBatchSendConfigs = lodash.get(action, 'payload.envoyBatchSendConfigs', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'envoyBatchSendConfigs', envoyBatchSendConfigs);
  });
  return nextState;
};
