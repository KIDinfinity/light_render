import lodash from 'lodash';
import type { FieldConfigureModel } from '../_dto/model';

/**
 * 获取符合edit update等功能field name
 *
 * 调用示例：findConfigsByFlagName(fieldConfigure, EFieldFlagName.editFlag)
 * @param fieldConfigs field 配置数据
 * @param flagName
 */
const findConfigsByFlagName = (
  fieldConfigs: FieldConfigureModel[],
  flag: string
): FieldConfigureModel => {
  return (
    lodash
      .chain(fieldConfigs)
      .filter((fitem) => !!fitem?.[flag])
      .value()[0] || {}
  );
};

export default findConfigsByFlagName;
