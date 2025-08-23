import { useCallback } from 'react';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';

export default () => {
  return useCallback(({ receiptAmt, paymentAmt, loadingPremium }: any) => {
    const receivableAmount = lodash.subtract(paymentAmt || 0, loadingPremium || 0);
    const value = (() => {
      if (receiptAmt < receivableAmount) {
        return receiptAmt;
      }
      return receivableAmount;
    })();
    return getFieldDisplayAmount(value, 'nb.policyList.premiumBreakdownBOList.receiptAmt');
  }, []);
};
