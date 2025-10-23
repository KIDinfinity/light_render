import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { EPayTo } from '../_dto/Enums';

/**
 * 找到所有beneficiary中payto为policy owner的payee
 * @param policyBenefitList
 */
const getPolicyOwnerPayeeIds = (policyBenefitList: BeneficiaryModal[]) => {
  if (lodash.isEmpty(policyBenefitList)) return [];

  return lodash
    .chain(policyBenefitList)
    .map((policyBenefit: PolicyBenefitModal) => {
      const { beneficiaryList } = policyBenefit;
      return lodash
        .chain(beneficiaryList)
        .filter(
          (beneficiaryItem: BeneficiaryModal) => beneficiaryItem.payTo === EPayTo.Policyholder
        )
        .map((beneficiaryItem: BeneficiaryModal) => formUtils.queryValue(beneficiaryItem.payeeId))
        .compact()
        .value();
    })
    .flatten()
    .compact()
    .uniq()
    .value();
};

export default getPolicyOwnerPayeeIds;
