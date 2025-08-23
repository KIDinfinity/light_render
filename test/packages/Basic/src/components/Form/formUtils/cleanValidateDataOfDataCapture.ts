/** 去除数据里的验证信息
 * @param {} dataSource 数据源
 * @return {} 返回的数据用于接口入参
 */

import * as FlattenJS from 'flattenjs';
import lodash from 'lodash';
import moment from 'moment';

const cleanValidateDataOfDataCapture = (dataSource: any) => {
  const result = lodash.cloneDeep(dataSource);

  const dataMap = FlattenJS.convert(result);
  // eslint-disable-next-line no-restricted-syntax
  for (const [path] of Object.entries(dataMap)) {
    const pathOfLast = path.substr(path.lastIndexOf('.') + 1);
    // 一定要有name
    if (pathOfLast === 'name') {
      const pathOfPrefix = path.replace(`.${pathOfLast}`, '');
      const pathOfValue = `${pathOfPrefix}.value`;
      const pathOfValidating = `${pathOfPrefix}.validating`;
      const pathOfDirty = `${pathOfPrefix}.dirty`;
      const pathOfTouched = `${pathOfPrefix}.touched`;
      // 排除是非验证数据的可能
      if (
        lodash.has(dataMap, pathOfValidating) ||
        lodash.has(dataMap, pathOfDirty) ||
        lodash.has(dataMap, pathOfTouched)
      ) {
        let pathOfValueValue = dataMap[pathOfValue];

        if (dataMap[`${pathOfValue}._isAMomentObject`]) {
          const dataValue = lodash.get(result, pathOfPrefix);
          pathOfValueValue = moment(dataValue.value).startOf('day').format();
        }

        if (dataMap[`${pathOfValue}[0]`]) {
          const dataValue = lodash.get(result, pathOfPrefix);
          pathOfValueValue = dataValue.value.join(',');
        }

        lodash.set(result, pathOfPrefix, pathOfValueValue);
      }
    }
  }

  return result;

};

export default cleanValidateDataOfDataCapture;
