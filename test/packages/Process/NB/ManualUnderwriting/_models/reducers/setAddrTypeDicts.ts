import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { addrTypeDicts } = lodash.pick(action?.payload, ['addrTypeDicts']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addrTypeDicts', addrTypeDicts);
  });
  return {
    ...nextState,
  };
};
