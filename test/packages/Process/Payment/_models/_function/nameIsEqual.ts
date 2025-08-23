import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const cleanStrSpace = (str: any) =>
  lodash.toLower(formUtils.queryValue(str))?.replace?.(/\s+/g, '');

/**
 * 去掉所有空字符后，转为小写比较字符串（常用于比较两个名字是否是同一个人）
 * @param prevName
 * @param nextName
 */
const nameIsEqual = (prevName: any, nextName: any) => {
  const prev = cleanStrSpace(prevName);
  const next = cleanStrSpace(nextName);

  return !!prev && !!next && prev === next;
};

export default nameIsEqual;
