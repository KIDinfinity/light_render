import { get, find } from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function findLimitByCode(
  listPolicy: any[],
  treatmentPayableItem: any,
  limitCode: string
) {
  const { policyNo, productCode, benefitItemCode } = treatmentPayableItem;

  const benefitPayableItem =
    find(listPolicy, {
      policyNo: formUtils.queryValue(policyNo),
      coreProductCode: formUtils.queryValue(productCode),
      benefitItemCode: formUtils.queryValue(benefitItemCode),
    }) || {};

  const accumulateLimitList = get(benefitPayableItem, 'accidentBenefit.accumulateLimitList');

  return find(accumulateLimitList, { limitCode });
}
