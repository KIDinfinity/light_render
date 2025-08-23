import safeParse from 'safe-json-parse/tuple';

/**
 * 安全解析JSON字符串
 * @method safeParseUtil
 * @param {string} target 需要转换的字符串
 * @param {any} defaultValue 可以是[]或{}
 * @return {object} 转换后的对象
 */
export default (target: any) => {
  const tuple = safeParse(target);

  if (tuple[0]) {
    return null;
  }

  return tuple[1];
};
