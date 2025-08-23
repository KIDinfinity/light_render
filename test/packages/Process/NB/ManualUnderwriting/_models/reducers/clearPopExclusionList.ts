import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addPopExclusionList', []);
    lodash.set(draftState, 'productSection', {});
  });
  return { ...nextState };
};
