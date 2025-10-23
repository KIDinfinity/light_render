import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const showAddButton = lodash.get(action, 'payload.showAddButton');
  const nextState = produce(state, (draftState: any) => {
    draftState.showAddButton = showAddButton;
  });
  return {
    ...nextState,
  };
};
