import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { isExceptional } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, 'isExceptionalAddLoading', isExceptional);
  });
  return { ...nextState };
};
