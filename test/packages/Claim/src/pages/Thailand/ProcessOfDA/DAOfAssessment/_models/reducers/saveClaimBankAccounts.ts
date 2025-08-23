import { produce } from 'immer';
import lodash from 'lodash';

import ePaymentMethod from 'claim/enum/PaymentMethod';
import { PayTo } from 'claim/enum/Payto';

const saveClaimBankAccounts = (state: any, action: any) => {
  const { policyNos, type } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities?.policyBenefitListMap, (item) => {
      if (lodash.includes(policyNos, item?.policyNo) && type === 'policyOwner') {
        lodash.set(item, 'paymentMethod', ePaymentMethod.bank);
        lodash.set(item, 'payTo', PayTo.policyOwner);
      } else if (lodash.includes(policyNos, item?.policyNo) && type === 'policyPayor') {
        lodash.set(item, 'paymentMethod', ePaymentMethod.bank);
        lodash.set(item, 'payTo', PayTo.policyPayor);
      }
    });
  });

  return { ...nextState };
};

export default saveClaimBankAccounts;
