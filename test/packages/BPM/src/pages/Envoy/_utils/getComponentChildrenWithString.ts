import lodash from 'lodash';
export default (target, field, recur = 5) => {
  const targetField = field || 'children';
  if (lodash.isString(target) || lodash.isNil(target)) {
    const result = target || '';
    return result;
  }
  let flagNum = 0;
  const findFunc = (targetObj) => {
    flagNum += 1;
    //最多找四层
    if (flagNum >= recur) {
      return '';
    }
    const tempTarget = targetObj?.props?.[targetField];
    if (lodash.isString(tempTarget) && tempTarget.length > 0) {
      return tempTarget;
    }
    if (lodash.isNil(tempTarget)) {
      return '';
    }
    if (lodash.isPlainObject(targetObj?.props)) {
      return findFunc(targetObj?.props?.children);
    }
    return '';
  };
  return findFunc(target) || '';
};
