import lodash from 'lodash';

const getFields = (obj: any, transfers?: any) => {
  const result = [];
  if (lodash.isObject(obj)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of lodash.entries(obj)) {

      let fVal = value

      if (!lodash.isObject(value) || !lodash.keys(value).includes('value')) {
        fVal = { value }
      } else if (lodash.isString(fVal?.name)) {
        fVal.name = [fVal.name]
      }


      // // value可以是字段值，也可以是包含了验证信息的对象
      // const fVal = lodash
      //   .chain(value)
      //   .keys()
      //   .some((item) =>
      //     ['value', 'locale', 'locale_old', 'locale_new', 'format', 'label'].includes(item)
      //   )
      //   .value()
      //   ? value
      //   : { value };
      // store数据map到form时，数据转换
      if (transfers && lodash.isFunction(transfers[key])) {
        fVal.value = transfers[key](fVal.value)
      }

      result.push({
        name: [key],
        ...fVal,
      });
    }
  }
  return result;
};

export default getFields;
