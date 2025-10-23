import { reduce } from 'lodash';
import { formUtils } from 'basic/components/Form';
/**
 * 根据校验规则校验的结果清除对象中的校验信息
 * @param clearPossible 可能需要清除校验信息的对象
 * @param validateFields 清除校验信息的依据
 */
export default (clearPossible: any, validateFields: any) => {
  return reduce(
    clearPossible,
    (collect: any, value: any, key: string) => {
      const dataCleaned = formUtils.cleanValidateData({ [key]: value });
      collect[key] = validateFields[key] ? dataCleaned[key] : value;
      return collect;
    },
    {}
  );
};
