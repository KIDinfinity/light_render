import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const packValue = (target: any, value: any) => {
  return lodash.isObject(target) ? { ...target, value } : value;
};

export default ({ value = '', contactType, paymentMethod, countryCode = '' }: any) => {
  const valueString = formUtils.queryValue(value);
  if (
    (contactType !== 'M' || paymentMethod !== 'FPS') &&
    lodash.includes(valueString, countryCode)
  ) {
    return packValue(value, valueString.replace(`${countryCode}-`, ''));
  }

  if (valueString.indexOf('-') > 0) return value;

  if (contactType === 'M' && paymentMethod === 'FPS') {
    return packValue(value, `${countryCode}-${valueString}`);
  }

  return value;
};
