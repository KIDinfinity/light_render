import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const expendedClient = lodash.get(action, 'payload.expendedClient', '');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'expendedClient', expendedClient);
  });
  return { ...nextState };
};
