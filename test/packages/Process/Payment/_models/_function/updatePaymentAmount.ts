import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { EPayTo } from '../_dto/Enums';

/**
 * 统计受益人的benefitAmount(payment amount)或beneficiary的beneficiaryAmount到payee的payment amount
 * @param policyBenefits
 * @param payeeList
 */
const updatePaymentAmount = (policyBenefits: PolicyBenefitModal[], payeeList?: PayeeModal[]) => {
  return lodash
    .chain(payeeList)
    .compact()
    .map((itemPayee: PayeeModal) => {
      if (lodash.isEmpty(policyBenefits)) {
        // eslint-disable-next-line no-param-reassign
        itemPayee.paymentAmount = 0;
        return itemPayee;
      }
      // eslint-disable-next-line no-param-reassign
      itemPayee.paymentAmount = +lodash
        .chain(policyBenefits)
        .reduce((result, itemBenefit: PolicyBenefitModal) => {
          const { payTo, beneficiaryList } = itemBenefit;
          const isBeneficiary = formUtils.queryValue(payTo) === EPayTo.Beneficiary;
          let benefitAmount = 0;

          if (isBeneficiary) {
            benefitAmount = lodash
              .chain(beneficiaryList)
              .filter(
                (itemBeneficiary: BeneficiaryModal) =>
                  formUtils.queryValue(itemBeneficiary.payeeId) &&
                  formUtils.queryValue(itemBeneficiary.payeeId) ===
                    formUtils.queryValue(itemPayee.id)
              )
              .reduce((amount, itemBeneficiary: BeneficiaryModal) => {
                return add(
                  formUtils.queryValue(itemBeneficiary.beneficiaryAmount) as number,
                  amount
                );
              }, 0)
              .value();
          } else {
            const benefitiary = lodash.chain(beneficiaryList).compact().first().value();
            if (
              formUtils.queryValue(benefitiary?.payeeId) &&
              formUtils.queryValue(benefitiary?.payeeId) === formUtils.queryValue(itemPayee.id)
            ) {
              benefitAmount = formUtils.queryValue(itemBenefit.benefitAmount) as number;
            }
          }

          return add(benefitAmount, result);
        }, 0)
        .value();

      return itemPayee;
    })
    .value();
};

export default updatePaymentAmount;
