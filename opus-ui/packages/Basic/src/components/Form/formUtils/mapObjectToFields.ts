/** store同步fields，只处理一层数据
 * @param {} obj 数据源，changedFiled
 * @param function transfers 对数据做转换
 * @return {} 返回的数据用于接口入参
 */

import lodash, { set } from 'lodash';
import { Form } from 'antd';

const mapObjectToFields = (obj: any, transfers?: any) => {
  const result = {};
  if (lodash.isObject(obj)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of lodash.entries(obj)) {
      // value可以是字段值，也可以是包含了验证信息的对象
      const fVal = lodash
        .chain(value)
        .keys()
        .some((item) =>
          ['value', 'locale', 'locale_old', 'locale_new', 'format', 'label'].includes(item)
        )
        .value()
        ? value
        : { value };

      // store数据map到form时，数据转换
      if (transfers && lodash.isFunction(transfers[key])) {
        set(fVal, 'value', transfers[key](fVal.value));
      }

      result[key] = Form.createFormField({
        ...fVal,
      });
    }
  }
  return result;

};

export default mapObjectToFields;
