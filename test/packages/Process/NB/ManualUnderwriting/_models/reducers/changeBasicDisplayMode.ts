import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const basicInfoDisplayMode = lodash.get(action, 'payload.basicInfoDisplayMode');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'basicInfoDisplayMode', basicInfoDisplayMode);
  });

  return { ...nextState };
};
