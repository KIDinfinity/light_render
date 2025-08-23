/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';
import { EDataType } from 'bpm/pages/Envoy/enum';
import type { TData } from 'bpm/pages/Envoy/type';
import {
  isDraftReason,
  notActiveReason,
  notActivateOrIsEnable,
} from 'bpm/pages/Envoy/_utils/getDisabled';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import {
  checkPendingMemo,
  checkDest,
  checkPolicy,
  checkChannelData,
  checkPayment,
  checkFreeField,
  checkLetter,
  checkHospRecipientCode,
} from 'bpm/pages/Envoy/_validator';

interface IAction {
  payload: {
    dataId?: string;
    type?: TData;
    sendDataId?: string;
  };
}

function* validateFields({ payload }: IAction, { select, put }: any) {
  const { dataId, type, sendDataId, allGroups } = lodash.pick(payload, ['dataId', 'type', 'sendDataId', 'allGroups']);
  const {
    currentReasonGroups,
    activedGroupKey,
    destRoleInfo,
    thPendPolicyReasonInfo,
    sendDataIdArr,
  } = yield select((state: any) =>
    lodash.pick(state?.envoyController, [
      'currentReasonGroups',
      'activedGroupKey',
      'destRoleInfo',
      'thPendPolicyReasonInfo',
      'sendDataIdArr',
    ])
  );
  const activateReasonGroups = lodash.filter(currentReasonGroups, (_, idx: number) => {
    return idx === activedGroupKey || allGroups;
  });
  const errorInfo = {};
  const setErrorInfo = (reasonGroup: any) => {
    const reasonDetails = lodash.get(reasonGroup, 'reasonDetails', []);
    const reasonGroupId = lodash.get(reasonGroup, 'id');
    lodash.set(errorInfo, `${reasonGroupId}`, {});
    const isSendReason =
      (type === EDataType.REASON && sendDataId === reasonGroupId) ||
      lodash.includes(sendDataIdArr, reasonGroupId) || allGroups;
    const reasonDetailErr = {};
    lodash.forEach(reasonDetails, (reasonDetail: any) => {
      const {
        id: detailId,
        claimNo: detailClaimNo,
        destRole: detailRole,
        dest: detailDest,
        channelDataList: detailChannelDataList,
        startTime: detailStartTime,
        period: detailPeriod,
        reasonReminders,
        status: detailStatus,
        enableReminder,
      } = reasonDetail;
      if (!reasonDetailErr[detailId]) {
        reasonDetailErr[detailId] = {};
      }
      if (isDraftReason(detailStatus)) {
        reasonDetailErr[detailId] = {
          ...checkDest(reasonDetailErr[detailId], reasonDetail, isSendReason),
          ...checkPolicy(
            reasonDetailErr[detailId],
            reasonDetail,
            thPendPolicyReasonInfo[reasonDetail?.reasonCode],
            isSendReason
          ),
          ...checkPayment(reasonDetailErr[detailId], reasonDetail, isSendReason),
          ...checkLetter(reasonDetailErr[detailId], reasonDetail, isSendReason),
          ...checkHospRecipientCode(reasonDetailErr[detailId], reasonDetail, isSendReason),
          ...checkPendingMemo(reasonDetailErr[detailId], reasonDetail, isSendReason),
          ...checkChannelData(
            reasonDetailErr[detailId],
            detailChannelDataList,
            {
              claimNo: detailClaimNo,
              destRoleInfo,
              destRole: detailRole,
              dest: detailDest,
              startTime: detailStartTime,
              period: detailPeriod,
            },
            isSendReason
          ),
          ...checkFreeField(reasonDetailErr[detailId], reasonDetail, isSendReason),
        };
      }
      if (!notActiveReason(detailStatus) && lodash.isArray(reasonReminders)) {
        lodash.forEach(reasonReminders, (reminderDetail: any) => {
          const {
            id: reminderId,
            claimNo: reminderClaimNo,
            destRole: reminderRole,
            dest: reminderDest,
            channelDataList: reminderChannelDataList,
            startTime: reminderStartTime,
            period: reminderPeriod,
          } = reminderDetail;
          if (!reasonDetailErr[detailId][reminderId]) {
            reasonDetailErr[detailId][reminderId] = {};
          }
          if (
            !notActivateOrIsEnable({
              remindersData: reasonReminders,
              enableReminder,
              reminderData: reminderDetail,
            })
          ) {
            const isSendReminder =
              (type === EDataType.REMINDER && sendDataId === reminderId) ||
              lodash.includes(sendDataIdArr, reminderId);
            reasonDetailErr[detailId][reminderId] = {
              ...checkDest(reasonDetailErr[detailId][reminderId], reminderDetail, isSendReminder),
              ...checkChannelData(
                reasonDetailErr[detailId][reminderId],
                reminderChannelDataList,
                {
                  claimNo: reminderClaimNo,
                  destRoleInfo,
                  destRole: reminderRole,
                  dest: reminderDest,
                  startTime: reminderStartTime,
                  period: reminderPeriod,
                },
                isSendReminder
              ),
            };
          }
        });
      }
      lodash.set(errorInfo, `${reasonGroupId}`, reasonDetailErr);
    });
  };
  if (!dataId || allGroups) {
    lodash.forEach(activateReasonGroups, (reasonGroup: any) => {
      setErrorInfo(reasonGroup);
    });
  } else {
    const defaultActivityGroup = lodash.chain(activateReasonGroups).find({ id: dataId }).value();
    if (defaultActivityGroup) {
      setErrorInfo(defaultActivityGroup);
    }
  }
  if (sendDataId) {
    yield put({
      type: 'addSendDataId',
      payload: {
        sendDataId,
      },
    });
  }
  yield put({
    type: 'saveErrorInfo',
    payload: {
      errorInfo,
    },
  });

  const flattenErrorInfo = FlattenJS.convert(
    sendDataId ? findObj(errorInfo, sendDataId) : errorInfo
  );
  const hasError = lodash.some(
    lodash.values(flattenErrorInfo),
    (item: any) => !lodash.isEmpty(item)
  );
  return hasError;
}

export default validateFields;
