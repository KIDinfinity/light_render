import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const getDeductPolicy = (listPolicy: any, benefitItemPayableListMap: any) => {
  return lodash.some(benefitItemPayableListMap, (benefitItem) => {
    return lodash
      .chain(listPolicy)
      .filter(
        (item) =>
          item?.policyNo === formUtils.queryValue(benefitItem?.policyNo) &&
          item?.benefitItemCode === formUtils.queryValue(benefitItem?.benefitItemCode) &&
          item?.benefitTypeCode === formUtils.queryValue(benefitItem?.benefitTypeCode)
      )
      .some({ deductPolicy: 'Y' })
      .value();
  });
};

export default {
  getDeductPolicy,
};
