/**
 * TODO:
 *   get every redeposit item, refresh exchange rate list by payout currency and payout exchange rate date.
 *   update every exchange rate in redeposit policy item.
 *    recalculate redeposit amount.
 */

import { multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash, { toNumber } from 'lodash';
import type { PayeeModal } from '../../../_dto/Models/PayeeModal';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    // newest exchange rate list, after payout currency changed or exchange rate date changed
    const redepositExchangeRateList = draft.redepositExchangeRateList;
    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { claimRedepositList, payoutCurrency, payoutAmount } = payee;

        const changedPayoutCurrency = formUtils.queryValue(payoutCurrency);
        const changedPayoutAmount = lodash.toNumber(formUtils.queryValue(payoutAmount));
        console.log('updateRedepositList: ', changedPayoutCurrency, changedPayoutAmount);
        const payeeTemp = { ...payee };
        const claimRedepositListTemp = lodash
          .chain(claimRedepositList)
          .map((claimRedeposit) => {
            const {
              redepositPolicyCurrency,
              redepositPercentage,
              exchangeRateRecord,
              redepositAmount,
            } = claimRedeposit;
            const redepositPercentageValue = toNumber(formUtils.queryValue(redepositPercentage));
            let newExchangeRateRecord = exchangeRateRecord;
            let newRedepositAmount = redepositAmount;

            // get newest exchange rate
            const toCurrency = redepositPolicyCurrency;
            const fromCurrency = changedPayoutCurrency;
            const newExchangeRate = lodash.find(
              redepositExchangeRateList,
              (rate) => rate.toCurrency === toCurrency && rate.fromCurrency === fromCurrency
            );
            newExchangeRateRecord = JSON.stringify([newExchangeRate]);

            // recalculate redeposit amount
            if (newExchangeRate && newExchangeRate?.exchangeRate) {
              newRedepositAmount = multiply(
                multiply(redepositPercentageValue * 0.01, changedPayoutAmount),
                newExchangeRate.exchangeRate
              );
            }

            return {
              ...claimRedeposit,
              exchangeRateRecord: newExchangeRateRecord,
              redepositAmount: newRedepositAmount,
            };
          })
          .value();
        return { ...payeeTemp, claimRedepositList: claimRedepositListTemp };
      })
      .value();
  });
};
