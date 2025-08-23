import lodash from 'lodash';
/**
 * 过滤掉源对象中指定key以外的成员(包括值为nullish)
 * @param source 源对象
 * @param keys 源对象中指定的key值数组
 */
export function filterByKeysAll(source: object, keys: string[]) {
  const output = {};
  lodash.forEach(keys, (key) => {
    output[key] = source[key];
  });
  return output;
}

export default {
  filterByKeysAll,
};
