import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Objects) => {
  const tabs = lodash.get(action, 'payload.tabs', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.tabs = tabs;
  });
  return {
    ...nextState,
  };
};
