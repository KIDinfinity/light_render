import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valid } from '@/services/claimTblValidFieldService';
import { MessageType } from 'claim/enum/medicalSearchMessageType';

export const validateMedicalName = async ({ item, fields, objectType, preItem }) => {
  const { id } = lodash.pick(item, 'id');
  const validateFileds = lodash.map(fields, (fieldCode) => {
    return {
      id,
      fieldCode,
      fieldValue: formUtils.queryValue(lodash.get(item, fieldCode)),
      objectType,
    };
  });
  const isEqual = (pre, current, list) => {
    let result = true;
    lodash.forEach(list, (i) => {
      if (!lodash.isEqual(formUtils.queryValue(pre[i]), formUtils.queryValue(current[i]))) {
        result = false;
      }
    });
    return result;
  };
  let warningList = [];
  let needUpdate = !isEqual(item, preItem, fields);
  if (needUpdate) {
    const response = await valid(validateFileds);
    // TODO: 该接口约定没有success 字段，以response 是否为array判断是否接口正常响应
    if (lodash.isArray(response)) {
      warningList = lodash.filter(
        response,
        (i) => i.messageType === MessageType.Error || i.messageType === MessageType.Information
      );
    } else {
      // 请求失败时不更新
      needUpdate = false;
    }
  }
  return {
    warningList,
    needUpdate,
  };
};

export const findFieldWarning = ({ list, id, fieldCode }) => {
  const warningMessage = lodash
    .chain(list)
    .filter((item) => item.id === id && item.fieldCode === fieldCode)
    .value();
  return warningMessage;
};

export const hasSomeTypeMessage = ({ warningMessage, messageType, taskNotEditable }) => {
  if (taskNotEditable) {
    return false;
  }
  let isWarning = false;
  const warningList = lodash.filter(warningMessage, (item) => item.messageType === messageType);
  if (warningList.length) {
    isWarning = true;
  }
  return isWarning;
};

export const filterMessage = ({ warningMessage, messageType, toString = true }) => {
  const message = lodash
    .filter(warningMessage, (item) => item.messageType === messageType)
    .map((item) => item.message);
  return toString ? message.join(',') : message;
};

export const filterNeedResetValueFields = ({ messageList }) => {
  const list = lodash.filter(messageList, (item) => item.needClean).map((item) => item.fieldCode);
  return list;
};

export const getAllFormErrors = ({ validateMessages }) => {
  let result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [, obj] of lodash.entries(validateMessages)) {
    result = [
      ...result,
      ...filterMessage({
        warningMessage: obj,
        messageType: MessageType.Error,
        toString: false,
      }),
    ];
  }
  return result;
};
