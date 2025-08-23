import * as FlattenJS from 'flattenjs';
import lodash from 'lodash';

export default (data: Object[] = [], condition: string = '') => {
  const flattenData = FlattenJS.convert(data);
  const regExp = new RegExp(`.${condition}$`);

  return lodash.filter(flattenData, (_, key: string) => regExp.test(key));
};
