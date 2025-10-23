import lodash from 'lodash';
import type { DropdownConfigureModel } from '../_dto/model';

/**
 * 根据指定的key获取分组数据
 * @param groupKey 分组的属性名
 * @param groupVal 分组的属性值
 * @param dropdownKey 目标下拉的field name
 * @param dropdownConfigures field 配置数据集合
 */
const getGroupedList = (
  groupKey: string,
  groupVal: string,
  dropdownKey: string,
  dropdownConfigures?: DropdownConfigureModel[],
  orderBy?: string
): DropdownConfigureModel[] => {
  if (!lodash.isArray(dropdownConfigures)) return [];

  return lodash
    .chain(dropdownConfigures)
    .groupBy(groupKey)
    .get(groupVal)
    .filter((dropdown: DropdownConfigureModel) => !!dropdown[dropdownKey])
    .uniqBy(dropdownKey)
    .orderBy(orderBy)
    .value();
};

export default getGroupedList;
