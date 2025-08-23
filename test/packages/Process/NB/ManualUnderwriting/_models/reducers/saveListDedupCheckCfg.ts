import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const listDedupCheckCfg = lodash.get(action, 'payload.listDedupCheckCfg');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'listDedupCheckCfg', listDedupCheckCfg);
  });
  return {
    ...nextState,
  };
};
