import { useCallback } from 'react';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';

export default () => {
  return useCallback(({ receiptAmt, paymentAmt, loadingPremium }: any) => {
    const value = receiptAmt;
    return getFieldDisplayAmount(value, 'nb.policyList.premiumBreakdownBOList.receiptAmt');
  }, []);
};
