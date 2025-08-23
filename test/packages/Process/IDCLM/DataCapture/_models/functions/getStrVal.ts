import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const getStrVal = (val: any) => (val && lodash.isString(val) ? val : '');

export const getBeneficiaryName = (firstName?: string, surname?: string) => {
  const firstNameVal = formUtils.queryValue(firstName);
  const surnameVal = formUtils.queryValue(surname);

  if (!firstNameVal && !surnameVal) return '';

  return `${getStrVal(firstNameVal)} ${getStrVal(surnameVal)}`;
};

export default getStrVal;
