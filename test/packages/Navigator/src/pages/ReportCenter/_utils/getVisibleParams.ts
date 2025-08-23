import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

export default ({ searchFields, params, overrideVisible }: any) => {
  const cleanParams = formUtils.cleanValidateData(params);

  const newParamsKeys = lodash
    .chain(lodash.keys(cleanParams))
    .reduce((obj: any, key: string) => {
      const newKey = key.split('_')?.[0] || '';

      if (key.indexOf('first') > 0 || key.indexOf('second') > 0) {
        return {
          ...obj,
          [newKey]:
            key.indexOf('first') > 0
              ? [cleanParams?.[key]]
              : [obj?.[newKey]?.[0], cleanParams?.[key]],
        };
      }
      return {
        ...obj,
        [key]: cleanParams?.[key],
      };
    }, {})

    .value();
  return lodash
    .chain(newParamsKeys)
    .keys()
    .reduce((newParams: any, key: string) => {
      const isVisible = (lodash.chain(searchFields) as any)
        .find({ fieldName: key })
        .get('visible')
        .value();
      return isVisible || overrideVisible
        ? {
            ...newParams,
            [key]: newParamsKeys[key],
          }
        : newParams;
    }, {})
    .value();
};
