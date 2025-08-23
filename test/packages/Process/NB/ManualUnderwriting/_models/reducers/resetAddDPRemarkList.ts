import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const trigger = lodash.get(action, 'payload.trigger', false);
  const nextState = produce(state, (draftState: any) => {
    if (trigger) lodash.set(draftState, 'addDPRemarkItems', []);
  });
  return { ...nextState };
};
