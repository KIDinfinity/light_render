import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: Object) => {
  const clientOptionConfigList = lodash.get(action, 'payload.clientOptionConfigList');
  const nextState = produce(state, (draftState: any) => {
    draftState.clientOptionConfigList = clientOptionConfigList;
  });
  return {
    ...nextState,
  };
};
