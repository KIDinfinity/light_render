import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import type { PayeeModal } from '../../../_dto/Models/PayeeModal';

export default (state: any, { payload }: any = {}) => {
  const { changedFields, payeeId } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { ownerPolicyMap, redepositExchangeRateList } = draft;
    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { claimRedepositList, id, payoutCurrency } = payee;
        const payoutCurrencyValue = formUtils.queryValue(payoutCurrency);
        const ownerPolicyList = payee?.clientId
          ? lodash.get(ownerPolicyMap, payee.clientId, [])
          : [];

        const newId = uuidv4();
        const viewOrder =
          (lodash.chain(claimRedepositList).map('viewOrder').max().value() || 0) + 1;

        const redepositPolicyNo = formUtils.queryValue(changedFields?.redepositPolicyNo);
        const redepositPolicyCurrency = lodash.find(
          ownerPolicyList,
          (policy) => policy.policyId === redepositPolicyNo
        )?.policyCurrency;
        const newExchangeRate = lodash.find(
          redepositExchangeRateList,
          (rate) =>
            rate.fromCurrency === payoutCurrencyValue && rate.toCurrency === redepositPolicyCurrency
        );
        const redepositAmount = 0;
        if (id === payeeId) {
          const payeeTemp = { ...payee };
          const redepositPolices = [
            ...(claimRedepositList || []),
            {
              id: newId,
              redepositPolicyNo,
              redepositAmount,
              redepositPolicyCurrency,
              exchangeRateRecord: JSON.stringify([newExchangeRate]),
              viewOrder,
            },
          ];

          return { ...payeeTemp, claimRedepositList: redepositPolices };
        }
        return payee;
      })
      .value();
  });
};
