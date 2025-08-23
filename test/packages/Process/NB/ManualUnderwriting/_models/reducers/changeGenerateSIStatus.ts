import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { generateSIStatus } = lodash.pick(action?.payload, ['generateSIStatus']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'generateSIStatus', generateSIStatus);
  });

  return {
    ...nextState,
  };
};
