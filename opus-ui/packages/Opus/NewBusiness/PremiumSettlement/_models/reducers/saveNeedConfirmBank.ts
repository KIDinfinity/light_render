import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const data = lodash.get(action, 'payload.needConfirmBank', '');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.needConfirmBank', data);
  });
  return { ...nextState };
};
