import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const cacheChatLink = lodash.get(action, 'payload.archiveList');
  const nextState = produce(state, (draftState: any) => {
    draftState.cacheChatLink = cacheChatLink;
  });
  return {
    ...nextState,
  };
};
