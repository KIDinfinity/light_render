import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import type { BeneficiaryModal } from '../../_dto/Models';
import { ClaimDecision } from 'claim/pages/utils/claim';

export const getTotalBenefitAmount = policyBenefitList => +lodash
  .chain(formUtils.cleanValidateData(policyBenefitList))
  .reduce((total: number, { beneficiaryList }: any) => {
    const benefitAmounts = +lodash
      .chain(beneficiaryList)
      .filter(({ beneficiaryAmount }) => !!beneficiaryAmount)
      .reduce((total, item: BeneficiaryModal) => {
        return add(formUtils.queryValue(item.beneficiaryAmount) || 0, total);
      }, 0)
      .value();

    return add(total, benefitAmounts);
  }, 0)
  .value();


export const getTotalClaimPayableAmount = (allclaimPayableList)=> +lodash
  .chain(allclaimPayableList)
  .filter((payable: any) => {
    const decision = formUtils.queryValue(payable.claimDecision);
    const payableAmount = formUtils.queryValue(payable.payableAmount);

    return (
      payableAmount &&
      (decision === ClaimDecision.approve ||
        decision === ClaimDecision.exGratia ||
        decision === ClaimDecision.pending)
    );
  })
  .reduce((total, payable: any) => {
    return add(formUtils.queryValue(payable.payableAmount) as number, total);
  }, 0)
  .value();
