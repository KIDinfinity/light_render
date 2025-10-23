import lodash from 'lodash';

const filterData = (formDataTemp: any): any => {
  return lodash.keys(formDataTemp).reduce((dataMap, key) => {
    const value = formDataTemp?.[key];
    if (lodash.isPlainObject(value) && !lodash.isEmpty(value)) {
      const result = filterData(value);
      if (!lodash.isEmpty(result)) {
        return {
          ...dataMap,
          [key]: result,
        };
      }
      return dataMap;
    }
    if (lodash.isNil(value) || value === '' || (lodash.isArray(value) &&!lodash.size(value))) {
      return dataMap;
    }
    return {
      ...dataMap,
      [key]: formDataTemp?.[key],
    };
  }, {});
};
export default (formDataTemp: any) => filterData(formDataTemp);
