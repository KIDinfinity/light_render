import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const contractType = lodash.get(action, 'payload.contractType', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'contractType', contractType);
  });
  return {
    ...nextState,
  };
};
