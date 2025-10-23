import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const addInformationBuffer = lodash.get(action, 'payload.addInformationBuffer', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addInformationBuffer', addInformationBuffer);
  });
  return { ...nextState };
};
