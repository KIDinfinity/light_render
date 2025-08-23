import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const isDisabledAddButton = lodash.get(action, 'payload.isDisabledAddButton');
  const nextState = produce(state, (draftState: any) => {
    draftState.isDisabledAddButton = isDisabledAddButton;
  });
  return {
    ...nextState,
  };
};
