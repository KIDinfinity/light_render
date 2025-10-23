import lodash from 'lodash';
import Config from '../Config';
import getMergedAuditLog from './getMergedAuditLog.ts';
/**
 * function:这个函数用来处理不应该让用户看到的埋点,以及一些埋点后处理，比如合并一些item
 * （区别于handleDiffMapForNotStandardDataSave，这里处理不会影响getDiff流程）
 */
export default (list, currentController, oldClaimData, newClaimData) => {
  const needRemoveAuditlogList =
    lodash.get(Config, `${currentController}.needRemoveAuditlog`) || [];
  const needMergedChangedFieldList =
    lodash.get(Config, `${currentController}.needMergedChangedFieldList`) || [];
  if (!lodash.isArray(needRemoveAuditlogList) && !lodash.isArray(needMergedChangedFieldList)) {
    return list;
  }
  if (!lodash.isArray(list) || list.length < 1) {
    return list;
  }
  let finalList = lodash.cloneDeep(list);
  //进行相关merge操作
  finalList = getMergedAuditLog({
    needMergedChangedFieldList,
    list,
    currentController,
    oldClaimData,
    newClaimData,
  });
  //过滤不需要展示的log
  finalList = finalList.filter((item) => {
    let targetPath = item.path;
    if (lodash.isString(targetPath)) {
      targetPath = targetPath.replace(/\[\d+\]/g, '');
    } else {
      return true;
    }
    return !needRemoveAuditlogList.some((element) => {
      let result = false;
      //这里进行匹配，对needRemoveItemList里面每一个item进行遍历匹配，匹配到了（所有属性值全等）说明这个item需要被过滤，不该被用户看到
      result = Object.keys(element).every((key) => {
        let curValue = item[key];
        if (key === 'includePath') {
          return targetPath && targetPath.includes(element[key])
        }
        if (key === 'path') {
          curValue = targetPath;
        }

        return curValue === element[key];
      });
      return result;
    });
  });
  return finalList;
};
