import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState.submitInfo, draftState.curGroupCode, {});
  });

  return {
    ...nextState,
  };
};
