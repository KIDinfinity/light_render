import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const transferAddItem = lodash.get(action, 'payload.transferAddItem', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'transferAddItem', transferAddItem);
  });
  return {
    ...nextState,
  };
};
