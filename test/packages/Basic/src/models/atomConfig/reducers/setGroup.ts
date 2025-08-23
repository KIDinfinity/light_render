import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { group, atomGroupCode } = lodash.pick(action?.payload, ['group', 'atomGroupCode']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `groups.${atomGroupCode}`, group);
  });
  return nextState;
};
