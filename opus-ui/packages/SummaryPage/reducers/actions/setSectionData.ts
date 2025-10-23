import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { data, dataPath } = lodash.pick(action?.payload, ['data', 'dataPath']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, dataPath, data);
  });

  return nextState;
};
