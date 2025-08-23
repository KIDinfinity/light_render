import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { checkDuplicating } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'checkDuplicating', checkDuplicating);
  });
  return { ...nextState };
};
