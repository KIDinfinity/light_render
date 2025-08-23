import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';
import { diff } from 'json-diff';
import { ActionValue, ChangeType, IgnoreFields } from '../Enum';
import { RegArrays, RegAction, RegAdded, RegNew, RegRemove } from './RegExps';
import getActionType from './getActionType';
import checkChangedField from './checkChangedField';
import checkExitSame from './checkExitSame';
import { getUpdateData, getAddRemoveData } from './getResultData';
// @ts-ignore
import getClaimData from './getClaimData';
import Config from '../Config';

export default ({ oldClaimData, newClaimData, changedFields, currentController, activityKey, isTitleSection }: any) => {
  const oldData = getClaimData(oldClaimData);
  const newData = getClaimData(newClaimData);
  const diffJson = diff(oldData, newData);
  const diffMap = FlattenJS.convert(diffJson);
  let actionTempMap = {};
  let actionArrays: any[] = [];
  const checkFieldsWithData = ({ path, fieldName, oldValue, newValue }: any) => {
    const claimData = lodash.get(newClaimData, path);
    const changedField = checkChangedField(claimData, changedFields, fieldName);
    if (changedField && (oldValue || newValue)) {
      const updateData = getUpdateData({
        path,
        fieldName,
        oldValue,
        newValue,
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
  // eslint-disable-next-line no-restricted-syntax
  for (const [path, value] of Object.entries(diffMap)) {
    const pathArrays = path.split('.');
    const lastPath = pathArrays[pathArrays.length - 1];
    const lastSecondPath: any = pathArrays[pathArrays.length - 2];
    const fieldPath = path?.substr(0, path?.lastIndexOf('.'));
    const isIgnoreField = lodash.includes(IgnoreFields, lastSecondPath);
    /**
     *  命中修改
     */
    // __new ,  __new.xxx
    // eslint-disable-next-line no-underscore-dangle
    if ((lastPath === ChangeType.__new && !isIgnoreField) || lastSecondPath === ChangeType.__new) {
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
          newClaimData,
        });
        if (actionData) {
          actionArrays.push(actionData);
        }
      }
    }
    // (__added|__deleted|__new), 且唯一
    // __new[0]
    if (RegAction.test(fieldPath) && !actionTempMap[`${fieldPath}`]) {
      actionTempMap[`${fieldPath}`] = true;
      const actionType = getActionType(lastSecondPath);
      if (actionType) {
        const actionData = getAddRemoveData({
          diffMap,
          path: fieldPath.replace(RegArrays, '[$1]').replace(RegNew, '').replace(RegAction, '[$2]'),
          currentController,
          type: actionType,
          newClaimData,
        });
        if (actionData) {
          actionArrays.push(actionData);
        }
      }
    }
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
  return actionArrays
};
