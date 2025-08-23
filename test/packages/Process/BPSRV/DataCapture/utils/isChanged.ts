import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const TEMP_FIELDS = ['subTypeCode', 'policyId', 'sourceSystem'];

export default (originObj?: any, compareObj?: any) => {
  // 源数据不存在
  if (!originObj) {
    return lodash
      .chain(compareObj)
      .toPairs()
      .some(([key, value]) => {
        return (
          !TEMP_FIELDS.includes(key) &&
          formUtils.queryValue(value) !== null &&
          formUtils.queryValue(value) !== '' &&
          formUtils.queryValue(value) !== undefined
        );
      })
      .value();
  }

  const orginObjOfAllFields = {
    ...originObj,
    ...lodash
      .chain(compareObj)
      .omit(TEMP_FIELDS)
      .reduce((result, value, key) => {
        // eslint-disable-next-line no-param-reassign
        result[key] = null;
        return result;
      }, {})
      .value(),
  };

  return lodash
    .chain(orginObjOfAllFields)
    .toPairs()
    .some(([key, value]) => {
      const originValue = formUtils.queryValue(value);
      const compareValue = formUtils.queryValue(compareObj[key]);

      const hasKey = lodash.has(compareObj, key);
      if (!hasKey) {
        return false;
      }

      if (
        ((originValue === null || originValue === '') && compareValue === null) ||
        compareValue === ''
      ) {
        return false;
      }

      return originValue !== compareValue;
    })
    .value();
};
