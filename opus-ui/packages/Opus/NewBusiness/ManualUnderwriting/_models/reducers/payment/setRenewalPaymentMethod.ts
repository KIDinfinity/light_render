import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { renewalPaymentMethod } = action.payload;
    if (!lodash.isNil(renewalPaymentMethod)) {
      draftState.processData.planInfoData.renewalPayType = renewalPaymentMethod;
      draftState.processData.paymentList[0].renewalPayType = renewalPaymentMethod;
    }
  });
  return { ...nextState };
};
