import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

export default ({ listPolicy, treatmentPayable }: any) => {
  return useMemo(() => {
    const {
      policyNo,
      productCode,
      benefitTypeCode,
      policyYear,
      calculateByPolicyYear,
    } = formUtils.cleanValidateData(treatmentPayable);
    const fn = (target: any) => {
      const {
        policyNo,
        coreProductCode,
        benefitTypeCode,
        benefitCategory,
        policyYear,
      }: any = lodash.pick(formUtils.cleanValidateData(target), [
        'policyNo',
        'coreProductCode',
        'benefitTypeCode',
        'benefitCategory',
        'policyYear',
      ]);
      const filterTarget = `${policyNo}${coreProductCode}${benefitTypeCode}${benefitCategory}`;
      const filterTargetWithpolicyYear =
        calculateByPolicyYear === CalculateByPolicyYear.F ||
        calculateByPolicyYear === CalculateByPolicyYear.Y
          ? `${filterTarget}${policyYear}`
          : filterTarget;
      return filterTargetWithpolicyYear;
    };

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        fn(item) ===
        fn({
          policyNo,
          coreProductCode: productCode,
          benefitTypeCode,
          benefitCategory: eBenefitCategory.Cashless,
          policyYear,
        })
    );

    return policyList;
  }, [listPolicy, treatmentPayable]);
};
