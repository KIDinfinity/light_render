import lodash from 'lodash';

/**
 *根据指定的key获取对应配置项数据
 * @param dropdowns
 * @param locateObject
 * @param dicName
 */
const getNameByCode = (dropdowns?: any[], locateObject?: any, dicName?: string): any => {
  if (!lodash.isArray(dropdowns) || !lodash.isString(dicName)) return {};
  const dict = lodash.chain(dropdowns).find(locateObject).value();
  return lodash.get(dict, dicName, '');
};

export default getNameByCode;
