import lodash from 'lodash';
import queryValue from './queryValue';

const objectQueryValue = (obj = {}) => {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of lodash.entries(obj)) {
    const qValue = queryValue(value);
    if (lodash.isObject(qValue)) {
      result[key] = objectQueryValue(qValue);
    } else {
      result[key] = qValue;
    }
  }
  return result;

};

export default objectQueryValue;
