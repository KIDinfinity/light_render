import lodash from 'lodash';

const queryValueUpdate = (objWithValidate: any, valueOrCallback: any) => {
  const isFieldObj = lodash
    .chain(objWithValidate)
    .keys()
    .some((item) =>
      ['value', 'locale', 'locale_old', 'locale_new', 'format', 'label'].includes(item)
    )
    .value();
  if(isFieldObj) {
    if(typeof valueOrCallback === 'function') {
      return {
        ...objWithValidate,
        value: valueOrCallback(objWithValidate.value)
      }
    }
    return {
      ...objWithValidate,
      valueOrCallback
    }
  }

  if(typeof valueOrCallback === 'function') {
    return valueOrCallback(objWithValidate)
  }
  return valueOrCallback
}

export default queryValueUpdate;
