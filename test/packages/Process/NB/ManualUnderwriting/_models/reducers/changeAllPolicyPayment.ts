import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const policyPayMode = lodash.get(action, 'payload.policyPayMode');
  const nextState = produce(state, (draftState: any) => {
    const paymentList = lodash
      .chain(draftState)
      .get('businessData.policyList[0].paymentList', [])
      .map((payment) => {
        return {
          ...payment,
          policyPayMode: formUtils.queryValue(policyPayMode),
        };
      })
      .value();

    lodash.set(draftState, 'businessData.policyList[0].paymentList', paymentList);
  });

  return { ...nextState };
};
