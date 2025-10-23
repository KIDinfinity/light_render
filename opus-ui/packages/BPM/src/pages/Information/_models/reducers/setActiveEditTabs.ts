import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const activeEditTabs = lodash.get(action, 'payload.activeEditTabs', '');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'activeEditTabs', activeEditTabs);
  });
  return {
    ...nextState,
  };
};
