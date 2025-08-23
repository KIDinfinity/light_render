import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

export default ({ list, clear, mapKeys: DefaultMapKeys }: any) => {
  // eslint-disable-next-line no-nested-ternary
  const newList = lodash.isArray(list) ? list : lodash.isObject(list) ? lodash.values(list) : [];
  const mapKeys = DefaultMapKeys || [
    'payableAmount',
    'payableDays',
    'boosterAmount',
    'boosterDays',
  ];
  const object = {
    payableAmount: null,
    payableDays: null,
    boosterAmount: null,
    boosterDays: null,
  };

  if (!clear) {
    lodash.map(mapKeys, (key) => {
      let keyValue = 0;

      lodash.map(newList, (mapItem) => {
        keyValue = add(Number(keyValue), Number(formUtils.queryValue(mapItem[key]) || 0));
      });
      object[key] = keyValue !== 0 ? keyValue : null;
    });
  }
  return { ...object };
};
