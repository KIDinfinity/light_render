import lodash from 'lodash';
import type { ReasonDisplayConfig } from 'bpm/pages/Envoy/dtos/EnvoyDisplayConfig';

export default (configs: ReasonDisplayConfig): any[] => {
  const configsKeyArr = lodash.keys(configs);
  const configsKeySortArr = lodash.sortBy(configsKeyArr, (item) => {
    return configs[item].sort;
  });
  const sortModuleArr: any[] = [];
  lodash.forEach(configsKeySortArr, (item) => {
    const currentItem = configs[item];
    if (currentItem?.sort && currentItem?.visible) {
      const moduleObj: any = {
        editable: currentItem?.editable || true,
        required: currentItem?.required || false,
        dropDownList: currentItem?.dropDownList || [],
      };
      if (currentItem?.custom) {
        moduleObj.custom = currentItem?.custom;
        moduleObj.moduleName = 'freeField';
      } else {
        moduleObj.moduleName = item;
      }
      sortModuleArr.push(moduleObj);
    }
  });
  return sortModuleArr;
};
