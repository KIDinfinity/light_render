import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { retrieveExistCorpFromLA } = action?.payload ?? {};
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, 'retrieveExistCorpFromLA', retrieveExistCorpFromLA);
  });
  return {
    ...nextState,
  };
};
