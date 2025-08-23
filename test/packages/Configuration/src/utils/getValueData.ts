import lodash from 'lodash';

export default (data: object) =>
  lodash
    .chain(data)
    .keys()
    .reduce((dataMap: any, key: string) => {
      if (!lodash.isNil(data[key]) && data[key] !== '') {
        return {
          ...dataMap,
          [key]: data[key],
        };
      }
      return {
        ...dataMap,
      };
    }, {})
    .value();
