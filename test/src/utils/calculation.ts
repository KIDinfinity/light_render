import lodash from 'lodash';
import { precisionEnsure } from '@/utils/precisionUtils';

class CalculationUtil {
  getMinProperty = (object = {}, keys = [], precision = false) => {
    const list = [];
    keys.forEach((item) => {
      const value = lodash.get(object, item);
      if (value !== undefined) {
        if (precision) {
          list.push(precisionEnsure(value));
        } else {
          list.push(parseInt(value, 10));
        }
      }
    });
    const result = lodash.min(list);

    return result;
  };

  getMaxProperty = (object = {}, keys = [], precision = false) => {
    const list = [];
    keys.forEach((item) => {
      const value = lodash.get(object, item);
      if (value !== undefined) {
        if (precision) {
          list.push(precisionEnsure(value));
        } else {
          list.push(parseInt(value, 10));
        }
      }
    });
    const result = lodash.max(list);

    return result;
  };

  getAmountsAndAddDefault = (object = {}, keys = []) => {
    const result = {};
    keys.forEach((item) => {
      result[item] = lodash.get(object, item, 0);
    });

    return result;
  };

  /**
   * 檢查是目標屬性是否都爲 undefined
   * @return {boolean}
   */
  checkParamsIsSet = (object = {}, keys = []) => {
    let result = false;
    keys.forEach((key) => {
      if (lodash.get(object, key) !== undefined) {
        result = true;
      }
    });

    return result;
  };
}
export default new CalculationUtil();
