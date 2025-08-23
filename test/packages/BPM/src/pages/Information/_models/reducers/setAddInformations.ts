import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const record = lodash.get(action, 'payload.record', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.addInformations = record;
  });
  return { ...nextState };
};
