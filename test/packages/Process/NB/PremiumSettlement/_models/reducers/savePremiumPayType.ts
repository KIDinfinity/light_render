import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const payType = lodash.get(action, 'payload.payType', '');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].refundPayType', payType);
  });
  return { ...nextState };
};
