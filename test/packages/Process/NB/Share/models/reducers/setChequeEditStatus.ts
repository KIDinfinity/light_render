import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { chequeEditStatus } = lodash.pick(action?.payload, ['chequeEditStatus']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'chequeEditStatus', chequeEditStatus);
  });

  return nextState;
};
