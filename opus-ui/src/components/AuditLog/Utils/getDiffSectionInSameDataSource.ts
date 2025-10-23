import lodash from 'lodash';
import Config from '../Config';
export default (targetPath, fieldName, currentController, titleType) => {
  const sectionPathMapList = lodash.get(Config, `${currentController}.sectionPathMapList`);
  if (lodash.isArray(sectionPathMapList)) {
    const target = sectionPathMapList.find((item) => {
      return item.pathList.includes(targetPath) && item.fieldNameList.includes(fieldName);
    });
    if (!lodash.isPlainObject(target)) {
      return '';
    }
    const getDataMap = lodash.get(Config, `${currentController}.dataMap`);
    if (!lodash.isFunction(getDataMap)) {
      return '';
    }
    const dataMap = getDataMap();
    const realSection = lodash.get(dataMap, target?.targetSection)?.[titleType];
    return realSection;
  }
  return '';
};
