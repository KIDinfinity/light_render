import lodash from 'lodash';

/**
 * 比较两个对象的属性值是否存在差异
 * @param source 源对象
 * @param target 目标对象
 * @param destignated 指定对象的key
 */
const hasChanges = (source: any, target: any, destignated?: string[]): boolean => {
  if (!lodash.isPlainObject(source) || !lodash.isPlainObject(target)) return false;
  let tempSource = { ...source };
  let tempTarget = { ...target };
  if (lodash.isArray(destignated)) {
    tempSource = lodash.pick(tempSource, destignated);
    tempTarget = lodash.pick(tempTarget, destignated);
  }

  return !lodash.isEqual(tempSource, tempTarget);
};

export default hasChanges;
