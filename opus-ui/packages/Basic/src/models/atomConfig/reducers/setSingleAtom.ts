import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { atomData, atomGroupCode, atomCode } = lodash.pick(action?.payload, [
    'atomData',
    'atomGroupCode',
    'atomCode',
  ]);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `single.${atomGroupCode}.${atomCode}`, atomData);
  });
  return nextState;
};
