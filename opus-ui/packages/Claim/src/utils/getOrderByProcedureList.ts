import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (ListMap: any, List: any) => {
  return lodash
    .chain(ListMap)
    .map((value, item) => {
      return lodash.includes(List, item) && { key: item, value };
    })
    .orderBy(({ value }) => {
      return formUtils.queryValue(value?.operationDate);
    })
    .map('key')
    .compact()
    .value();
};
