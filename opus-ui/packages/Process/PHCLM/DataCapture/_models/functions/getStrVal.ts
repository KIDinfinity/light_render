import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const getStrVal = (val: any) => (val && lodash.isString(val) ? val : '');

export const getBeneficiaryName = (firstName?: string, surname?: string,middleName?: string) => {
  const firstNameVal = formUtils.queryValue(firstName);
  const middleNameVal = formUtils.queryValue(middleName);
  const surnameVal = formUtils.queryValue(surname);

  if (!firstNameVal && !surnameVal && !middleNameVal)  return '';

  return `${getStrVal(firstNameVal)} ${getStrVal(middleNameVal)} ${getStrVal(surnameVal)}`;
};

export default getStrVal;
