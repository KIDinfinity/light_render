/**
 * TODO: get payout exchange date
 * recalculate every redeposit amount, and exchange rate record
 */
import { safeParseUtil } from '@/utils/utils';
import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal } from '../../../_dto/Models/PayeeModal';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const redepositExchangeRateList = draft.redepositExchangeRateList;
    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { claimRedepositList } = payee;
        const payeeTemp = { ...payee };
        const claimRedepositListTemp = lodash
          .chain(claimRedepositList)
          .map((claimRedeposit) => {
            const { exchangeRateRecord } = claimRedeposit;
            const exchangeRateRecordTemp = safeParseUtil(exchangeRateRecord)?.[0];
            const newExchangeRate = lodash.find(
              redepositExchangeRateList,
              (rate) =>
                rate.toCurrency === exchangeRateRecordTemp.toCurrency &&
                rate.fromCurrency === exchangeRateRecordTemp.fromCurrency
            );
            return { ...claimRedeposit, exchangeRateRecord: JSON.stringify([newExchangeRate]) };
          })
          .value();
        return { ...payeeTemp, claimRedepositList: claimRedepositListTemp };
      })
      .value();
  });
};
