import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const bankCodeFilterArray = lodash.get(action, 'payload.bankCodeFilterArray', []);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'bankCodeFilterArray', bankCodeFilterArray);
  });
  return {
    ...nextState,
  };
};
