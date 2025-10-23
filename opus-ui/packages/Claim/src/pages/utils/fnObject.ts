import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

/**
 * 复制源对象中指定key的值到目标对象上
 * @param target 目标对象
 * @param source 源对象
 * @param keys 源对象中指定的key值数组
 */
export function assignByKeys(target: object, source: object, keys: string[]) {
  const tempSource = lodash.pick(source, keys);

  return lodash.mergeWith({}, target, tempSource, (objValue, srcValue) => srcValue);
}

/**
 * 过滤掉源对象中指定key以外的成员
 * @param source 源对象
 * @param keys 源对象中指定的key值数组
 */
export function filterByKeys(source: object, keys: string[]) {
  return lodash.pick(source, keys);
}

export const getPropsValue = (value: any, keyValue: any) => {
  return formUtils.queryValue(lodash.find(value, { key: keyValue }));
};

export default {
  assignByKeys,
  filterByKeys,
  getPropsValue,
};
