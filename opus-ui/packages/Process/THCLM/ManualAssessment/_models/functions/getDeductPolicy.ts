import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const getDeductPolicy = (listPolicy: any, benefitTypeData: any) => {
  const deductPolicy = lodash.some(benefitTypeData?.children, (benefitItem) => {
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

  return deductPolicy ? 'Y' : 'N';
};

export default {
  getDeductPolicy,
};
