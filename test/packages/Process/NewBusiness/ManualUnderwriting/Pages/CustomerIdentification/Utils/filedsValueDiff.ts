import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ fieldConfig, originalData, newData }: any) => {
  const transValue = (item: any) => {
    const field = lodash.get(fieldConfig, 'field');
    const fieldType = lodash.get(fieldConfig, 'fieldType');
    const value = formUtils.queryValue(lodash.get(item, field));
    if (fieldType === 'Date') {
      const dateReg = /[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}T[0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}.[0-9]{3,3}\+[0-9]{4,4}$/;
      if (lodash.isString(value) && dateReg.test(value)) {
        return value.replace(/\+[0-9]{4,4}$/, '+0800');
      }
      return value;
    }
    return value;
  };
  return lodash.isEqual(transValue(originalData), transValue(newData));
};
