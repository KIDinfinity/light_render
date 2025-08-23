import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的某个键名} pathKey
 * @param {层级对象的某个值} pathValue
 */
const queryFlattenPath = (dataSource: any, parentKey: any, pathKey: any, pathValue: any) => {
  const dataMap = FlattenJS.convert(dataSource);

  let dataPath = '';
  Object.keys(dataMap).forEach((path) => {
    const regExp = new RegExp(`${parentKey}[[0-9]*].${pathKey}$`);

    if (regExp.test(path) && dataMap[path] === pathValue) {
      dataPath = path;
    }
  });

  return dataPath;
};
/**
 *
 * @param {数据源} dataSource
 * @param {当前修改的数据项所在的父级键名} parentKey
 * @param {当前修改的数据项中指定身份的键名} pathKey
 * @param {指定身份键名的值} pathValue
 * @return {返回path的数组}
 */

const queryFlattenPathArray = (dataSource: any, parentKey: any, pathKey: any, pathValue: any) => {
  const dataMap = FlattenJS.convert(dataSource);

  const regExp = new RegExp(`${parentKey}[[0-9]*].${pathKey}$`);
  let dataPathArray: any[] = [];
  Object.keys(dataMap).forEach((path) => {
    if (regExp.test(path) && dataMap[path] === pathValue) {
      dataPathArray = [...dataPathArray, path];
    }
  });

  return dataPathArray;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的某个键名} pathKey
 * @param {层级对象的某个值} pathValue
 */
const queryObjectFlattenPath = (dataSource: any, parentKey: any, pathKey: any, pathValue: any) => {
  const flattenPath = queryFlattenPath(dataSource, parentKey, pathKey, pathValue);
  const objectPath = flattenPath.substr(0, flattenPath.lastIndexOf('.'));

  return objectPath;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的某个键名} pathKey
 * @param {层级对象的某个值} pathValue
 */
const queryParentFlattenPath = (dataSource: any, objIdValue: any) => {
  const dataMap = FlattenJS.convert(dataSource);

  let dataPath = '';
  Object.keys(dataMap).forEach((path) => {
    if (dataMap[path] === objIdValue) {
      dataPath = path;
    }
  });
  const parentPath = dataPath.slice(0, -6);

  return parentPath;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的id} parentIdKey
 * @param {层级对象的id的值} parentIdValue
 * @param {层级对象的数组的key} parentArrayKey
 */
const queryParentArrayFlattenPath = (
  dataSource: any,
  parentIdKey: any,
  parentIdValue: any,
  parentArrayKey: any
) => {
  const dataMap = FlattenJS.convert(dataSource);

  let dataPath = '';
  Object.keys(dataMap).forEach((path) => {
    const regExp = new RegExp(`${parentIdKey}$`);

    if (regExp.test(path) && dataMap[path] === parentIdValue) {
      dataPath = path.replace(regExp, parentArrayKey);
    }
  });

  return dataPath;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的某个键名} pathKey
 * @param {层级对象的某个值} pathValue
 */
const queryObjectByFlattenPath = (
  dataSource: any,
  parentKey: any,
  pathKey: any,
  pathValue: any
) => {
  const objectFlattenPath = queryObjectFlattenPath(dataSource, parentKey, pathKey, pathValue);

  return lodash.get(dataSource, objectFlattenPath);
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {key: 路径, value: 路径值, obj: 要保存的对象} obj
 */
const saveObjectByFlattenPath = (dataSource: any, { parentKey, key, value, detail }: any) => {
  const newDataSource = { ...dataSource };
  const objectFlattenPath = queryObjectFlattenPath(newDataSource, parentKey, key, value);

  if (objectFlattenPath) {
    lodash.set(newDataSource, objectFlattenPath, {
      ...detail,
    });
  }

  return newDataSource;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {
 *  parentIdKey: 要修改的array同级字段id,
 *  parentIdValue: id值,
 *  parentArrayKey: array的key值
 *  deleteItemId: 删除项id的值
 * } obj
 */
const deleteObjectByFlattenPath = (
  dataSource: any,
  { parentIdKey, parentIdValue, parentArrayKey, deleteItemId }: any
) => {
  const parentFlattenPath = queryParentArrayFlattenPath(
    dataSource,
    parentIdKey,
    parentIdValue,
    parentArrayKey
  );

  // 必须深拷贝dataSource
  const newDataSource = lodash.cloneDeep(dataSource);
  if (parentFlattenPath) {
    const oldList = lodash.get(newDataSource, parentFlattenPath);
    const newList = oldList.filter((item: any) => item.id !== deleteItemId);
    lodash.set(newDataSource, parentFlattenPath, newList);
  }

  return newDataSource;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {parentIdKey: 要修改的array同级字段id, parentIdValue: id值,parentArrayKey: array的key值 obj: 新增项} obj
 */
const addObjectByFlattenPath = (
  dataSource: any,
  { parentIdKey, parentIdValue, parentArrayKey, addItem }: any
) => {
  const parentFlattenPath = queryParentArrayFlattenPath(
    dataSource,
    parentIdKey,
    parentIdValue,
    parentArrayKey
  );
  const newDataSource = { ...dataSource };

  if (parentFlattenPath) {
    const oldList = lodash.get(newDataSource, parentFlattenPath);
    const newList = [...oldList, addItem];
    lodash.set(newDataSource, parentFlattenPath, newList);
  }

  return newDataSource;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {parentIdKey: 要修改的array同级字段id, parentIdValue: id值,parentArrayKey: array的key值 obj: 新增项} obj
 */
const addArrayByFlattenPath = (
  dataSource: any,
  { parentIdKey, parentIdValue, parentArrayKey, addArray }: any
) => {
  const parentFlattenPath = queryParentArrayFlattenPath(
    dataSource,
    parentIdKey,
    parentIdValue,
    parentArrayKey
  );
  const newDataSource = { ...dataSource };

  if (parentFlattenPath) {
    const oldList = lodash.get(newDataSource, parentFlattenPath);
    const newList = [...oldList, ...addArray];
    lodash.set(newDataSource, parentFlattenPath, newList);
  }

  return newDataSource;
};

/**
 *
 * @param {要修改的数据源} dataSource
 * @param {key: 路径, value: 路径值, obj: 要保存的对象} obj
 */
const saveFieldByFlattenPath = (dataSource: any, { parentKey, key, value, obj }: any) => {
  const newDataSource = { ...dataSource };
  const objectFlattenPath = queryObjectFlattenPath(newDataSource, parentKey, key, value);

  if (objectFlattenPath) {
    const orginData = lodash.get(newDataSource, objectFlattenPath);
    lodash.set(newDataSource, objectFlattenPath, {
      ...orginData,
      ...obj,
    });
  }

  return newDataSource;
};

export default {
  queryFlattenPath,
  queryParentFlattenPath,
  queryParentArrayFlattenPath,
  queryObjectByFlattenPath,
  saveObjectByFlattenPath,
  deleteObjectByFlattenPath,
  addObjectByFlattenPath,
  addArrayByFlattenPath,
  saveFieldByFlattenPath,
  queryFlattenPathArray,
};
