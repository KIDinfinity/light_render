import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const paymentMethodType = lodash.get(action, 'payload.paymentMethodType', '');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].paymentMethodType', paymentMethodType);
    lodash.set(
      draftState,
      'businessData.policyList[0].paymentList',
      lodash.map(lodash.get(draftState, 'businessData.policyList[0].paymentList'), (item: any) => {
        return {
          ...item,
          paymentMethodType,
        };
      })
    );
  });
  return { ...nextState };
};
