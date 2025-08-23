import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { renewalPaymentMethod } = action.payload;
    if (!lodash.isNil(renewalPaymentMethod)) {
      lodash.set(draftState, 'businessData.policyList[0].renewalPayType', renewalPaymentMethod);
      lodash.set(
        draftState,
        'businessData.policyList[0].paymentList[0].renewalPayType',
        renewalPaymentMethod
      );
    }
  });
  return { ...nextState };
};
