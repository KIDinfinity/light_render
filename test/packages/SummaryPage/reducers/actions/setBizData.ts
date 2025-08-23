import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const bizData = lodash.get(action, 'payload.bizData', {});

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'bizData', bizData);
  });
  return nextState;
};
