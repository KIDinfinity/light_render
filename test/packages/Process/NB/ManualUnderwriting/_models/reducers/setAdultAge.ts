import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { adultAge } = lodash.pick(action?.payload, ['adultAge']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'adultAge', adultAge);
  });
  return {
    ...nextState,
  };
};
