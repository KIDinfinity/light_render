import lodash from 'lodash';
import moment from 'moment';
import { ActionType } from '../Enum';
import getArrayName from './getArrayName';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getRepeatCount from './getRepeatCount';
import isValidTimestamp from './isValidTimestamp.ts';

const checkValue = (value: any, format: any, locale: any, typeCode: any) => {
  if (typeCode) {
    return formatMessageApi({ [typeCode]: value });
  }
  if (value && lodash.isArray(safeParseToArray(value))) {
    if (locale) {
      return lodash.isArray(locale) ? locale?.join(',') : locale;
    }
    let targetArray = [];
    if (lodash.isArray(value)) {
      targetArray = value;
    } else if (lodash.isArray(safeParseToArray(value))) {
      targetArray = safeParseToArray(value);
    }
    const arrayValue = targetArray.map((item) => {
      if (format && item) {
        return moment(item)?.format(format) || item;
      } else {
        return item;
      }
    });
    return arrayValue?.join(',');
  }
  if (format && value) {
    return !lodash.isNaN(Date.parse(value)) || moment.isMoment(value) || isValidTimestamp(value)
      ? moment(value).format(format)
      : value;
  }
  if (locale) {
    return lodash.isArray(locale) ? locale?.join(',') : locale;
  }
  return value;
};

const getActionName = (actionType: string) => {
  return formatMessageApi({
    Label_BIZ_Claim: actionType === ActionType.Add ? 'form.add' : 'form.delete',
  });
};

const getUpdateData = ({
  path,
  fieldName,
  oldValue,
  newValue,
  changedField,
  newClaimData,
  currentController,
  isTitleSection,
}: any) => {
  const { label, locale_old, locale_new, format, typeCode } = changedField?.__change || {};
  const { section, titleSection } = getArrayName({
    path,
    currentController,
    newClaimData,
    fieldName,
  });
  const oldData = checkValue(oldValue, format, locale_old, typeCode);
  const newData = checkValue(newValue, format, locale_new, typeCode);
  return !lodash.isEqual(String(oldData), String(newData))
    ? {
        path,
        section,
        titleSection: titleSection || '',
        type: ActionType.Update,
        oldValue: oldData,
        newValue: newData,
        label,
        fieldName,
      }
    : false;
};

const getAddRemoveData = ({
  diffMap,
  path: oldPath,
  type,
  currentController,
  oldClaimData,
  newClaimData,
}: any) => {
  const path = getRepeatCount({ diffMap, path: oldPath });
  const { section, arrayName } = getArrayName({
    type,
    path,
    currentController,
    oldClaimData,
    newClaimData,
    diffMap,
    isArray: true,
  });
  const actionName = getActionName(type);
  const sectionName = section ? `${section} / ` : '';
  return arrayName
    ? {
        path,
        section,
        type,
        label: `${actionName} ${sectionName}${arrayName}`,
      }
    : false;
};
function safeParseToArray(str) {
  try {
    const result = JSON.parse(str);
    if (lodash.isArray(result)) {
      return result;
    } else {
      return str;
    }
  } catch (err) {
    return str;
  }
}
export { getUpdateData, getAddRemoveData };
