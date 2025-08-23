import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const bankCodeList = lodash.get(action, 'payload.bankCodeList', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'bankCodeList', bankCodeList);
  });
  return {
    ...nextState,
  };
};
