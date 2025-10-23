/** 去除数据里的验证信息
 * @param {} dataSource 数据源
 * @return {} 返回的数据用于接口入参
 */

import * as FlattenJS from 'flattenjs';
import lodash from 'lodash';
import moment from 'moment';

const cleanValidateData = (dataSource: any) => {
  const result = lodash.cloneDeep(dataSource);
  const dataMap = FlattenJS.convert(result);
  // eslint-disable-next-line no-restricted-syntax
  for (const [path] of Object.entries(dataMap)) {
    const pathOfLast = path.substr(path.lastIndexOf('.') + 1);

    // 一定要有name, antd4 name是数组
    if (pathOfLast === 'name' || pathOfLast === 'name[0]') {
      const pathOfPrefix = path.replace(new RegExp(`.${pathOfLast}$`, 'g'), '');
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
        let pathOfValueValue = lodash.get(result, pathOfValue);
        if (dataMap[`${pathOfValue}._isAMomentObject`]) {
          const dataValue = lodash.get(result, pathOfPrefix);
          pathOfValueValue = moment(dataValue.value)
            // .startOf('day')
            .format();
        }

        lodash.set(result, pathOfPrefix, pathOfValueValue);
      }
    }
  }

  return result;
};

export default cleanValidateData;
