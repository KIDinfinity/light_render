import lodash from 'lodash';

export default ({ value = '', contactType, paymentMethod, countryCode = '' }: any) => {
  if ((contactType !== 'M' || paymentMethod !== 'FPS') && lodash.includes(value, countryCode)) {
    return lodash.replace(value,`${countryCode}-`, '' );
  }

  if (lodash.indexOf(value, '-') > 0) return value;

  if (contactType === 'M' && paymentMethod === 'FPS') {
    return `${countryCode}-${value}`;
  }

  return value;
};
