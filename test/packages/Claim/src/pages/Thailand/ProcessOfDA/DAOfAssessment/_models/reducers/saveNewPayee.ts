import { produce } from 'immer';
import lodash from 'lodash';
import ePaymentMethod from 'claim/enum/PaymentMethod';
import { PayTo } from 'claim/enum/Payto';

const saveNewPayee = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities?.policyBenefitListMap, (item) => {
      lodash.set(item, 'paymentMethod', ePaymentMethod.bank);
      lodash.set(item, 'payTo', PayTo.newPayee);
    });
  });
  return { ...nextState };
};

export default saveNewPayee;
