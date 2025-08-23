import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const stepsChange = lodash.get(action, 'payload.stepsChange', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange', stepsChange);
  });
  return { ...nextState };
};
