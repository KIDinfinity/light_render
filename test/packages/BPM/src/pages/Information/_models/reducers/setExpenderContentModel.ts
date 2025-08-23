import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: Object) => {
  const expenderModel = lodash.get(action, 'payload.expenderModel', 'history');
  const nextState = produce(state, ( draftState: any) => {
    lodash.set(draftState, 'expenderModel', expenderModel)
  })
  return {
    ...nextState,
  };
}
