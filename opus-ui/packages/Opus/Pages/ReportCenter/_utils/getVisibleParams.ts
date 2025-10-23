import lodash from 'lodash';

export default ({ searchFields, params }: any) => {
  return lodash
    .chain(params)
    .keys()
    .reduce((newParams: any, key: string) => {
      const componentTypeMap = ['number_range', 'text_range'];
      const target = lodash.find(searchFields, (item: any) => {
        if (lodash.includes(componentTypeMap, item?.componentType)) {
          return `${item.fieldName}_first` === key || `${item.fieldName}_second` === key;
        }
        return item.fieldName === key;
      });
      const isVisible = target?.visible;

      if (isVisible && lodash.includes(componentTypeMap, target?.componentType)) {
        const indexMap = { [`${target.fieldName}_first`]: 0, [`${target.fieldName}_second`]: 1 };
        const index = indexMap[key];

        if (
          lodash.has(newParams, target.fieldName) &&
          lodash.isArray(newParams[target.fieldName])
        ) {
          newParams[target.fieldName][index] = params[key];
        } else {
          const arr = [];
          arr[index] = params[key];
          newParams[target.fieldName] = arr;
        }

        return newParams;
      }
      return isVisible
        ? {
            ...newParams,
            [key]: params[key],
          }
        : newParams;
    }, {})
    .value();
};
