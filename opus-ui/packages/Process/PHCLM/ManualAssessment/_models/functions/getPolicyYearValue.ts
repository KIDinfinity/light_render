import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';
import { formUtils } from 'basic/components/Form';

const getPolicyYearValue = (item: any) => {
  return item?.calculateByPolicyYear === CalculateByPolicyYear.F ||
    item?.calculateByPolicyYear === CalculateByPolicyYear.Y
    ? formUtils.queryValue(item?.policyYear)
    : '';
};

export default getPolicyYearValue;
