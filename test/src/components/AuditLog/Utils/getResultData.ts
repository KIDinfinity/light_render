import lodash from 'lodash';
import moment from 'moment';
import { ActionType } from '../Enum';
import getArrayName from './getArrayName';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getRepeatCount from './getRepeatCount';

const checkValue = (value: any, format: any, locale: any, typeCode: any) => {
  if (typeCode) {
    return formatMessageApi({ [typeCode]: value });
  }
  if (format && value) {
    return !lodash.isNaN(Date.parse(value)) || moment.isMoment(value)
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
  const { section, titleSection } = getArrayName({ path, currentController, newClaimData });
  const oldData = checkValue(oldValue, format, locale_old, typeCode);
  const newData = checkValue(newValue, format, locale_new, typeCode);
  return !lodash.isEqual(oldData, newData)
    ? {
        path,
        section,
        titleSection: isTitleSection ? titleSection : '',
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
  newClaimData,
}: any) => {
  const path = getRepeatCount({ diffMap, path: oldPath });

  const { section, arrayName } = getArrayName({
    path,
    currentController,
    newClaimData,
    isArray: true,
  });

  const actionName = getActionName(type);
  return arrayName
    ? {
        path,
        section,
        type,
        label: `${actionName} ${arrayName}`,
      }
    : false;
};

export { getUpdateData, getAddRemoveData };
