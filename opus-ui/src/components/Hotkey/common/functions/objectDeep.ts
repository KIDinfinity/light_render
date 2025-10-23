import * as FlattenJS from 'flattenjs';
import lodash from 'lodash';

export default (data: Object[] = [], condition: string = '') => {
  const flattenData = FlattenJS.convert(data);
  const regStr = `.${condition}$`;
  const regExp = new RegExp(regStr);

  return lodash
    .chain(flattenData)
    .map((value: any, key: string) => {
      if (regExp.test(key)) {
        return lodash.get(data, key.replace(regExp, ''));
      }
    })
    .compact()
    .value();
};
