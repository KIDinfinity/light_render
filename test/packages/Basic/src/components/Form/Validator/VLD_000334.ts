import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { tenant } from '@/components/Tenant';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';

/**
 * 以保单号分组校验policy benefit以及payable对应的金额是否一致
 * @param policyBenefitList policy benefit数据
 * @param claimPayableList payable数据
 */
export const VLD_000334 = (curPolicyBenefit: PolicyBenefitModal, claimPayableList: any[]) => {
  const output = { result: false };
  if (tenant.isPH()) return output;
  if (lodash.isEmpty(curPolicyBenefit) || lodash.isEmpty(claimPayableList)) return output;
  const { policyNo, beneficiaryList } = formUtils.cleanValidateData(curPolicyBenefit);

  const claimPayableGrouped = lodash.groupBy(
    formUtils.cleanValidateData(claimPayableList),
    'policyNo'
  );

  const benefitAmounts = +lodash
    .chain(beneficiaryList)
    .filter((beneficiary: BeneficiaryModal) => !!formUtils.queryValue(beneficiary.benefitAmount))
    .reduce((total, beneficiary: BeneficiaryModal) => {
      return add(formUtils.queryValue(beneficiary.benefitAmount) as number, total);
    }, 0)
    .value();

  const payableAmounts = +lodash
    .chain(claimPayableGrouped[policyNo])
    .filter(
      (payable: any) =>
        !!formUtils.queryValue(
          payable.payableAmount &&
            (payable.claimDecision === ClaimDecision.approve ||
              payable.claimDecision === ClaimDecision.exGratia ||
              payable.claimDecision === ClaimDecision.pending)
        )
    )
    .reduce((total, payable: any) => {
      return add(formUtils.queryValue(payable.payableAmount) as number, total);
    }, 0)
    .value();

  output.result = benefitAmounts !== payableAmounts;

  return output;
};
