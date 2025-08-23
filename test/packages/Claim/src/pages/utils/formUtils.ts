/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import lodash, {
  values,
  isEmpty,
  findIndex,
  has,
  forEach,
  isArray,
  cloneDeep,
  isPlainObject,
} from 'lodash';
import { AvailableUse } from 'claim/enum/availableUse';

export const shouldUpdateState = (validating: boolean = false, changedFields: any) => {
  changedFields = changedFields || {};
  const changedFieldsEntries = values(changedFields);
  if (isEmpty(changedFieldsEntries)) return true;
  return findIndex(changedFieldsEntries, (item: any) => !item.dirty) !== -1;
};

const hasDirty = (object) =>
  has(object, 'name') &&
  has(object, 'value') &&
  (has(object, 'dirty') ||
    has(object, 'touched') ||
    has(object, 'errors') ||
    has(object, 'validating'));

const cleanObjectDirty = (object) => {
  forEach(object, (value, key) => {
    if (isPlainObject(value) && isArray(value)) {
      forEach(value, (item) => {
        cleanObjectDirty(item);
      });
    }
    if (isPlainObject(value) && !hasDirty(value)) {
      cleanObjectDirty(value);
    }
    if (isPlainObject(value) && hasDirty(value)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = value.value;
    }
  });
};

/**
 * 清除数据的表单域数据
 * @param object 数据
 */
export const cleanFieldsMeta = (object) => {
  const copyObject = cloneDeep(object);
  cleanObjectDirty(copyObject);

  return copyObject;
};

/**
 * 获取字段的真值
 * @param field 字段
 */
export const getFieldValue = (field: any | string) => {
  if (hasDirty(field)) {
    return field.value;
  }
  return field;
};

export const filterBenefitList = (listPolicy: any) =>
  lodash
    .chain(listPolicy)
    .map((item) => {
      const availableUse = lodash.get(item, 'availableUse') === AvailableUse.N;
      if (availableUse) {
        return item?.benefitItemCode;
      }
      return '';
    })
    .compact()
    .value();
