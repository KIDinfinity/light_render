import lodash from 'lodash';
import type { DropdownConfigureModel } from '../_dto/model';

/**
 *根据指定的key获取对应配置项数据
 * @param dropdownConfigures
 * @param locateObject
 */
const getNameByCode = (
  dropdownConfigures?: DropdownConfigureModel[],
  locateObject?: any
): DropdownConfigureModel | any => {
  if (!lodash.isArray(dropdownConfigures)) return {};
  return lodash.chain(dropdownConfigures).find(locateObject).value();
};

export default getNameByCode;
