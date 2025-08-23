import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ premiumBreakdownList }: any) => {
  return useMemo(() => {
    const set = new Set();
    let receivedLoadingAmount = 0;
    lodash.forEach(premiumBreakdownList, (item: any) => {
      const paymentAmt = item?.paymentAmt || 0;
      const loadingPremium = item?.loadingPremium || 0;
      const receiptAmt = item?.receiptAmt || 0;
      const receivableAmount = lodash.subtract(paymentAmt, loadingPremium);
      if (receiptAmt > receivableAmount) {
        const result = lodash.chain(receiptAmt).subtract(receivableAmount).round(2).value();
        set.add(result);
      }
    });
    lodash.forEach(Array.from(set), (amount: any) => {
      receivedLoadingAmount = lodash.chain(receivedLoadingAmount).add(amount).round(2).value();
    });
    return receivedLoadingAmount;
  }, [premiumBreakdownList]);
};
