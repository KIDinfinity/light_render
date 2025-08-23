import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { verifyStatus } = lodash.pick(action?.payload, ['verifyStatus']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'verifyStatus', verifyStatus);
  });

  return nextState;
};
