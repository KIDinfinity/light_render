import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const businessData = lodash.get(action, 'payload.businessData', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'initialBusinessData', businessData);
  });
  return {
    ...nextState,
  };
};
