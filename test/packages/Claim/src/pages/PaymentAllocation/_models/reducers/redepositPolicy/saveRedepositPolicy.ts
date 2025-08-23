import { safeParse } from '@/utils/cache/utils';
import { multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal } from '../../../_dto/Models';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { changedFields, id: redepositPolicyId, payeeId } = payload;
    const { ownerPolicyMap } = draft;
    const { payeeList } = draft.claimData;
    const redepositExchangeRateList = draft.redepositExchangeRateList;

    const editStatus = lodash.keys(changedFields).length === 1;
    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { claimRedepositList, id, payoutAmount } = payee;
        const payoutAmountValue = lodash.toNumber(formUtils.queryValue(payoutAmount));
        if (id === payeeId) {
          const payeeTemp = { ...payee };
          const ownerPolicyList = payee?.clientId
            ? lodash.get(ownerPolicyMap, payee.clientId, [])
            : [];
          const redepositPolices = lodash
            .chain(claimRedepositList)
            .compact()
            .map((redepositPolicy) => {
              if (redepositPolicy.id === redepositPolicyId) {
                const redepositPolicyTemp = { ...redepositPolicy };
                const changedPolicyNo = lodash.has(changedFields, 'redepositPolicyNo');
                const changedRedepositPercentage = lodash.has(changedFields, 'redepositPercentage');

                if (changedPolicyNo && editStatus) {
                  const newPolicyNo = formUtils.queryValue(changedFields?.redepositPolicyNo);
                  const newCurrency = lodash.find(
                    ownerPolicyList,
                    (policy) => policy.policyId === newPolicyNo
                  )?.policyCurrency;
                  if (!!newCurrency) {
                    const newExchangeRate = lodash.find(
                      redepositExchangeRateList,
                      (rate) =>
                        rate.fromCurrency === payeeTemp.payoutCurrency &&
                        rate.toCurrency === newCurrency
                    );
                    redepositPolicyTemp.redepositPolicyCurrency = newCurrency;
                    redepositPolicyTemp.exchangeRateRecord = JSON.stringify([newExchangeRate]);
                    redepositPolicyTemp.redepositAmount = 0;
                    redepositPolicyTemp.redepositPercentage = 0;
                  }
                }
                if (changedRedepositPercentage && editStatus) {
                  const newRedepositPercentage = formUtils.queryValue(
                    changedFields?.redepositPercentage
                  );

                  const exchangeRate = safeParse(redepositPolicyTemp?.exchangeRateRecord)?.[0]
                    ?.exchangeRate;

                  redepositPolicyTemp.redepositAmount = multiply(
                    multiply(newRedepositPercentage, payoutAmountValue),
                    exchangeRate * 0.01
                  );
                }
                return { ...redepositPolicyTemp, ...changedFields };
              }
              return redepositPolicy;
            })
            .value();
          return { ...payeeTemp, claimRedepositList: redepositPolices };
        }
        return payee;
      })
      .value();
  });
};
