import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const ageChange = lodash.get(action, 'payload.ageChange', false);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'ageChange', ageChange);
  });
  return {
    ...nextState,
  };
};
