import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default ({ item }: any) => {
  const dataMap = new Map();

  for (const [key, valueItem] of lodash.entries(item)) {
    const result = (() => {
      const value = lodash.toString(formUtils.queryValue(valueItem));
      if (lodash.isPlainObject(valueItem) && lodash.has(valueItem, 'value')) {
        return {
          ...valueItem,
          value,
        };
      }
      return value;
    })();
    dataMap.set(key, result);
  }

  return Object.fromEntries(dataMap);
};
