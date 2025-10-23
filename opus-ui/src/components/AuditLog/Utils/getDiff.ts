import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';
import { diff } from 'json-diff';
import { ActionValue, ChangeType, IgnoreFields, ChangedFieldType } from '../Enum';
import { RegArrays, RegAction, RegAdded, RegNew, RegRemove } from './RegExps';
import getActionType from './getActionType';
import checkChangedField from './checkChangedField';
import checkExitSame from './checkExitSame';
import { getUpdateData, getAddRemoveData } from './getResultData';
// @ts-ignore
import getClaimData from './getClaimData';
import Config from '../Config';
import handleDiffMapForNotStandardDataSave from './handleDiffMapForNotStandardDataSave.ts';
import handleAddRemoveData from './handleAddRemoveData';

export default ({
  oldClaimData,
  newClaimData,
  changedFields,
  currentController,
  activityKey,
  isTitleSection,
}: any) => {
  const oldData = getClaimData(oldClaimData);
  const newData = getClaimData(newClaimData);
  const diffJson = diff(oldData, newData, { sort: true });
  let diffMap = FlattenJS.convert(diffJson);
  diffMap = handleDiffMapForNotStandardDataSave(diffMap);
  let actionTempMap = {};
  let actionArrays: any[] = [];
  let addedItemFlag = false;
  const checkFieldsWithData = ({ path, fieldName, oldValue, newValue }: any) => {
    // 如果没有path的时候(比如在最外层的submissionDate的时候直接读取claimData的值)
    const claimData = !path
      ? newClaimData
      : lodash.get(newClaimData, path) || lodash.get(oldClaimData, path);
    const changedField = checkChangedField(
      claimData,
      changedFields,
      fieldName,
      path,
      currentController,
      oldValue,
      newValue
    );
    if (changedField && (oldValue || newValue)) {
      //将newValue确定为newClaimData里面对应的最新value（防止MUW里的fund添加一个修改上一个会出现bug）
      const finalNewValue = claimData?.[fieldName] !== oldValue ? claimData?.[fieldName] : newValue;

      const updateData = getUpdateData({
        path,
        fieldName,
        oldValue,
        newValue: finalNewValue,
        changedField,
        currentController,
        newClaimData,
        activityKey,
        isTitleSection,
      });
      if (updateData) {
        actionArrays.push(updateData);
      }
    }
  };
  const getNewObjectDiff = (newMap, index = 0) => {
    let map;
    try {
      map = Object.fromEntries(Object.entries(lodash.cloneDeep(newMap)).slice(index));
    } catch (err) {
      return;
    }
    const extractMap = {};
    let newObjectType = '';
    let targetKey = '';
    //判断addType类型
    for (const key in map) {
      if (lodash.isString(key) && RegAdded.test(key)) {
        newObjectType = ChangedFieldType.AddedChangedType;
      }
      //+优先级高于__added
      if (map[key] === '+') {
        targetKey = key;
        newObjectType = ChangedFieldType.PlusChangedType;
        break;
      }
      //+优先级高于__added
      if (map[key] === '-') {
        targetKey = key;
        newObjectType = ChangedFieldType.MinusChangedType;
        break;
      }
    }
    if (!newObjectType) {
      return;
    }
    //组装newDiffMap
    switch (newObjectType) {
      case ChangedFieldType.AddedChangedType:
        for (const key in map) {
          if (
            lodash.isString(key) &&
            RegAdded.test(key) &&
            (lodash.isString(map[key]) || lodash.isNumber(map[key]))
          ) {
            extractMap[key?.replace('__added', '')] = map[key];
          }
        }
        break;
      case ChangedFieldType.PlusChangedType:
        const prefix = targetKey.substring(0, targetKey.lastIndexOf('[') + 1);
        for (const key in map) {
          if (key?.startsWith(prefix) && (lodash.isString(map[key]) || lodash.isNumber(map[key]))) {
            extractMap[key] = map[key];
          }
        }
        break;
      case ChangedFieldType.MinusChangedType:
        const minusPrefix = targetKey.substring(0, targetKey.lastIndexOf('[') + 1);
        for (const key in map) {
          if (
            key?.startsWith(minusPrefix) &&
            (lodash.isString(map[key]) || lodash.isNumber(map[key]))
          ) {
            extractMap[key] = map[key];
          }
        }
        break;
      default:
        break;
    }
    //将diffMap丢到checkFieldsWithData继续update流程
    for (const [path, value] of Object.entries(extractMap)) {
      let oldValue = '';
      let newValue = '';
      switch (newObjectType) {
        case ChangedFieldType.AddedChangedType:
        case ChangedFieldType.PlusChangedType:
          newValue = value;
          break;
        case ChangedFieldType.MinusChangedType:
          oldValue = value;
          break;
        default:
          break;
      }
      const claimPath = path?.substr(0, path?.lastIndexOf('.'))?.replace(RegArrays, '[$1]');
      const fieldName = path?.substring(path?.lastIndexOf('.') + 1);
      const isIgnoreField = lodash.includes(IgnoreFields, fieldName);
      if (!isIgnoreField && claimPath && fieldName) {
        checkFieldsWithData({
          path: claimPath,
          fieldName,
          oldValue,
          newValue,
        });
      }
    }
  };
  diffMap = handleAddRemoveData({ diffMap });
  //针对新增多条item的时候捕获不到内容变更，捕获到之后需要index才可以不重复捕获相同内容
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const [path, value] of Object.entries(diffMap)) {
    const pathArrays = path.split('.');
    const lastPath = pathArrays[pathArrays.length - 1];
    const lastSecondPath: any = pathArrays[pathArrays.length - 2];
    const fieldPath = path?.substr(0, path?.lastIndexOf('.'));
    const isIgnoreField = lodash.includes(IgnoreFields, lastSecondPath);

    if ((lastPath === ChangeType.__new && !isIgnoreField) || lastSecondPath === ChangeType.__new) {
      /**
       *  命中修改
       */
      // __new ,  __new.xxx
      // eslint-disable-next-line no-underscore-dangle
      // eslint-disable-next-line no-underscore-dangle
      const oldPath = path.replace(ChangeType.__new, ChangeType.__old);
      const oldValue = diffMap?.[oldPath];
      const claimPath =
        // eslint-disable-next-line no-underscore-dangle
        lastSecondPath === ChangeType.__new
          ? path.replace(RegNew, '')
          : fieldPath?.substr(0, fieldPath?.lastIndexOf('.'))?.replace(RegArrays, '[$1]');
      checkFieldsWithData({
        path: claimPath,
        fieldName: lastSecondPath,
        oldValue,
        newValue: value,
      });
    }
    // /__added/ || __deleted
    const matchAdd = RegAdded.test(lastPath);
    const matchDeleted = RegRemove.test(lastPath);
    if (matchAdd || matchDeleted) {
      const newFieldName = lastPath.replace(RegAdded, '').replace(RegRemove, '');
      const claimPath = fieldPath?.replace(RegArrays, '[$1]');
      checkFieldsWithData({
        path: claimPath,
        fieldName: newFieldName,
        oldValue: matchAdd ? null : value,
        newValue: matchAdd ? value : null,
      });
    }
    /**
     *  命中数组操作
     */
    // + -
    // @ts-ignore
    const targetAction = ActionValue?.[value];
    if (value && targetAction) {
      //命中这个表示新增了一个对象
      //目标将封装一个函数，将新增的字段走update逻辑添加到actionArrays中，old值都是空
      if (targetAction === ActionValue?.['+']) {
        getNewObjectDiff(diffMap, index);
      }
      //存在"-"的时候updateField，但是不生成deleteItem的log(JP_claim_dataCapture_incident_treatment_procedure_通院治療_受診日)
      //这里针对：1.需要log的字段作为一个对象存储 2.删除，不能走后面的getAddRemoveData逻辑（删除一条item的）
      //TODO：1.让逻辑走checkFieldsWithData 2.虚拟表单逻辑添加删除逻辑处理生成changeField
      const minusSignLogFieldList = lodash.get(
        Config,
        `${currentController}.minusSignLogFieldList`
      );
      if (targetAction === ActionValue?.['-'] && lodash.isArray(minusSignLogFieldList)) {
        const tempPath = path.replace(RegArrays, '[$1]').replace(/\[\d+\]/g, '');
        const targetItem = minusSignLogFieldList.find((ele) => {
          return ele.path === tempPath;
        });
        const beforeFieldPath = path.replace(/0(?=\]\]$)/, '1');
        const targetPath = beforeFieldPath + '.' + targetItem?.fieldName;
        if (targetItem && diffMap?.[targetPath]) {
          getNewObjectDiff(diffMap, index);
          continue;
        }
      }
      const { exitSame, diffs, newTempMap } = checkExitSame({
        path,
        lastPath,
        diffMap,
        actionTempMap,
        changedFields,
        newClaimData,
        currentController,
      });
      if (diffs) {
        actionArrays = actionArrays.concat(diffs);
      }
      actionTempMap = newTempMap;
      if (!exitSame) {
        const arrayPath = path?.replace(RegArrays, '[$1]');
        const actionData = getAddRemoveData({
          diffMap,
          path: arrayPath,
          currentController,
          type: targetAction,
          oldClaimData,
          newClaimData,
        });
        if (actionData) {
          actionArrays.push(actionData);
        }
      }
    }

    // (__added|__deleted|__new), 且唯一
    // __new[0]
    //区分于RegAction.test(fieldPath)，有的__added新增后面没有[num]序号(MUW的fund里面有fund__added.fundInfoList[0].xxx),此为add一条后updatefield逻辑
    if (RegAdded.test(fieldPath) && !addedItemFlag) {
      getNewObjectDiff(diffMap, index);
      addedItemFlag = true;
    }
    //此为add一条item逻辑（没有add后update field逻辑）
    if (RegAction.test(fieldPath) && !actionTempMap[`${fieldPath}`]) {
      actionTempMap[`${fieldPath}`] = true;
      const actionType = getActionType(lastSecondPath);
      if (actionType) {
        const actionData = getAddRemoveData({
          diffMap,
          path: fieldPath.replace(RegArrays, '[$1]').replace(RegNew, '').replace(RegAction, '[$2]'),
          currentController,
          type: actionType,
          oldClaimData,
          newClaimData,
        });
        if (actionData) {
          actionArrays.push(actionData);
        }
      }
    }
    index++;
  }
  const onlySection = lodash.get(Config, `${currentController}.onlySection`);

  if (onlySection) {
    return lodash
      .chain(actionArrays)
      .map((item) => {
        if (lodash.hasIn(item, 'newValue') || lodash.hasIn(item, 'oldValue')) {
          const sectionSplit = item?.section?.split('/') || [];
          const section =
            sectionSplit?.[sectionSplit?.length - 1 || 0]?.replace(/[0-9]/g, '')?.trim() || '';
          return {
            label: `${item?.type || ''}${section}`,
            section,
            type: item?.type || '',
            path: item?.path,
          };
        }
        return { ...item, label: item?.label?.replace(/[0-9]/g, '')?.trim() };
      })
      .uniqBy('label')
      .value();
  }
  return actionArrays;
};
