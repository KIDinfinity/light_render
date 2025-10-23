import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const bankList = lodash.get(action, 'payload.bankList', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList.[0].bankInfoList', bankList);
  });
  return {
    ...nextState,
  };
};
