import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 验证 value 是否匹配 validValues.item.validField
 * @param validValues 为函数时表示 validValues 需要通过 validValues([ value ]) 获取
 * @param validField 字段
 * @param isRequired 是否为 required
 */
export const VLD_000197 = (
  validValues: Function | any[],
  validField?: string,
  isRequired?: boolean
) => async (rule: any, value: any, callback: Function) => {
  const response: any = lodash.isFunction(validValues) ? await validValues([value]) : null;
  if (lodash.isFunction(validValues) && (!response || !response.success)) {
    // 这里最好还应该有一个提示 “验证失败 - 获取数据失败”
    return callback();
  }

  const values: any[] = response ? response.resultData : validValues;
  if (!lodash.isArray(values)) {
    // 这里最好还应该有一个提示 “验证失败 - 数据格式有误”
    return callback();
  }

  if (lodash.isEmpty(value) && !isRequired) {
    return callback();
  }

  if (values.findIndex((item) => item[validField as string] === value) !== -1) {
    return callback();
  }

  return callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000194' }));
};
