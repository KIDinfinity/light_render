import lodash from 'lodash';

const queryValue = (objWithValidate: any) =>
  lodash
    .chain(objWithValidate)
    .keys()
    .some((item) =>
      ['value', 'locale', 'locale_old', 'locale_new', 'format', 'label'].includes(item)
    )
    .value()
    ? objWithValidate.value
    : objWithValidate;

export default queryValue;
