import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const selectedTabs = lodash.get(action, 'payload.selectedTabs');
  const nextState = produce(state, (draftState: any) => {
    draftState.selectedTabs = selectedTabs;
  });
  return {
    ...nextState,
  };
};
