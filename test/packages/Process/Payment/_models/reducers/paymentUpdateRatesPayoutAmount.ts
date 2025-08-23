import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { updatePayoutAmount, getEchangeRateAmount } from '../_function';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { exchangeRateList } = payload;
    const { claimData } = draft;
    const { policyBenefitList, payeeList } = claimData;
    const policyBenefitListTemp = lodash.map(
      policyBenefitList,
      (policyBenefit: PolicyBenefitModal) => ({
        ...policyBenefit,
        beneficiaryList: lodash
          .chain(policyBenefit.beneficiaryList)
          .compact()
          .map((beneficiaryItem: BeneficiaryModal) => {
            const { amount, payoutExchangeRate, exchangeRateRecords } = getEchangeRateAmount({
              exchangeRateList,
              amount: formUtils.queryValue(beneficiaryItem.benefitAmount),
              fromCurrency: formUtils.queryValue(beneficiaryItem.policyCurrency),
              toCurrency: formUtils.queryValue(beneficiaryItem.payoutCurrency),
            });

            return {
              ...beneficiaryItem,
              payoutAmount: amount,
              payoutExchangeRate,
              exchangeRateRecord: exchangeRateRecords,
              exchangeRateRecords,
            };
          })
          .value(),
      })
    );

    claimData.policyBenefitList = policyBenefitListTemp;
    claimData.payeeList = updatePayoutAmount(policyBenefitListTemp, payeeList, exchangeRateList);
  });
};
