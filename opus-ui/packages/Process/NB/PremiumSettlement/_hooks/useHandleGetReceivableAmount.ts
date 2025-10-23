import { useCallback } from 'react';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';

export default () => {
  return useCallback(({ paymentAmt, loadingPremium }: any) => {
    const value = lodash
      .chain(paymentAmt || 0)
      .toNumber()
      .subtract(loadingPremium || 0)
      .value();
    return getFieldDisplayAmount(value, 'nb.policyList.premiumBreakdownBOList.paymentAmt');
  }, []);
};
