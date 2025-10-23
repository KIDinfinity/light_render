import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import ChangeOperation from 'enum/ChangeOperation';
/**
 * @param {array} object.sectionConfig section 层级的配置
 * @param {object} object.dataItem 数据值
 * @param {boolean} object.reverse 是否反向操作
 */
export default ({ sectionConfig, dataItem, reverse }: any) => {
  const valueMap = new Map();

  lodash
    .chain(dataItem)
    .entries()
    .forEach((item: any) => {
      const [key, value] = item;
      if (
        lodash.some(sectionConfig, (fieldConfig) => {
          return (
            fieldConfig?.field === key &&
            fieldConfig?.changeOperation &&
            !lodash.isNull(fieldConfig?.changeParam)
          );
        })
      ) {
        const targetFieldConfig = lodash.find(sectionConfig, (fieldConfig: any) => {
          return fieldConfig?.field === key;
        });
        const {
          changeOperation,
          changeParam,
          changeResultLimitMin,
        } = lodash.pick(targetFieldConfig, [
          'changeParam',
          'changeOperation',
          'changeResultLimitMin',
        ]);
        const originValue = (() => {
          const unkonwTypeValue = formUtils.queryValue(value);
          if (lodash.isString(unkonwTypeValue)) {
            if (/^[0-9]{1,}$/.test(unkonwTypeValue)) {
              return lodash.toNumber(unkonwTypeValue);
            }
          }
          return unkonwTypeValue;
        })();
        if (!lodash.isNull(originValue)) {
          const v = (() => {
            if (
              (changeOperation === ChangeOperation.time && reverse === false) ||
              (changeOperation === ChangeOperation.divided && reverse === true)
            ) {
              return originValue * changeParam;
            }
            if (
              (changeOperation === ChangeOperation.add && reverse === false) ||
              (changeOperation === ChangeOperation.minus && reverse === true)
            ) {
              return originValue + changeParam;
            }
            if (
              (changeOperation === ChangeOperation.minus && reverse === false) ||
              (changeOperation === ChangeOperation.add && reverse === true)
            ) {
              return originValue - changeParam;
            }
            if (
              (changeOperation === ChangeOperation.divided && reverse === false) ||
              (changeOperation === ChangeOperation.time && reverse === true)
            ) {
              return originValue / changeParam;
            }
            return originValue;
          })();
          const validateMin = (() => {
            if (!lodash.isNull(changeResultLimitMin)) {
              return lodash.max([v, changeResultLimitMin]);
            }
            return v;
          })();
          const objectValue = (() => {
            if (lodash.isPlainObject(value) && lodash.has(value, 'value')) {
              return {
                ...value,
                value: validateMin,
              };
            } else {
              return validateMin;
            }
          })();
          valueMap.set(key, objectValue);
        } else {
          valueMap.set(key, value);
        }
      } else {
        valueMap.set(key, value);
      }
    })
    .value();

  return Object.fromEntries(valueMap);
};
