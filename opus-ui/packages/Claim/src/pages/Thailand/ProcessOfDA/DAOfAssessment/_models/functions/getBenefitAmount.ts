import lodash from 'lodash';
import CaseCategory from 'basic/enum/CaseCategory';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

export default (listKeys: any, tempList: any, policyNo: string, caseCategory: string) => {
  let benefitAmount: number | null = 0;
  if (lodash.isArray(listKeys) && listKeys.length > 0) {
    lodash.map(listKeys, (claimPayableItemId) => {
      const item = tempList.claimPayableListMap[claimPayableItemId] || {};
      if (formUtils.queryValue(policyNo) === formUtils.queryValue(item.policyNo)) {
        if (caseCategory === 'TH_GC_CTG01') {
          // RC
          benefitAmount = add(item.payableAmount, benefitAmount);
        } else if (
          caseCategory === 'IDAC' ||
          caseCategory === CaseCategory.TH_GC_CTG06 ||
          caseCategory === CaseCategory.TH_GC_CTG07
        ) {
          benefitAmount =
            item.benefitCategory === 'C' || item.benefitCategory === 'A'
              ? add(item.payableAmount, benefitAmount)
              : benefitAmount;
        }
      }
    });
  }

  return benefitAmount;
};
