import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const sustainabilityOption = lodash.get(action, 'payload.sustainabilityOption');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.sustainabilityOption', sustainabilityOption);
  });
  return {
    ...nextState,
  };
};
