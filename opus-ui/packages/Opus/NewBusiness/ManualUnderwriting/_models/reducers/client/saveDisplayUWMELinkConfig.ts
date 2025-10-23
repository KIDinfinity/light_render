import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const displayUWMELink = lodash.get(action, 'payload.displayUWMELink', false);

  const nextState = produce(state, (draftState: any) => {
    draftState.displayUWMELink = displayUWMELink;
  });

  return {
    ...nextState,
  };
};
