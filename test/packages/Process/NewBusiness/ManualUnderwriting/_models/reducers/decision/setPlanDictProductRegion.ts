import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { planDictProductRegion } = lodash.pick(action?.payload, ['planDictProductRegion']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'planDictProductRegion', planDictProductRegion);
  });
  return {
    ...nextState,
  };
};
