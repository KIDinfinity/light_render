import lodash from 'lodash';
import { produce } from 'immer';
import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import {
  getReasonGroupVar,
  getReasonDetailVar,
  getReasonReminderVar,
} from 'bpm/pages/Envoy/_utils/getCustomVar';

interface IAction {
  payload: {
    oldData: any;
    newData: any;
    newActivityKey: any;
    newBusinessNo: any;
    newCaseCategory: any;
    newCaseNo: any;
    newInquiryBusinessNo: any;
    newTaskId: any;
    newTaskStatus: any;
  };
}
export default function updateEnvoyData(state, { payload }: IAction) {
  const {
    oldData,
    newData,
    newActivityKey,
    newBusinessNo,
    newCaseCategory,
    newCaseNo,
    newInquiryBusinessNo,
    newTaskId,
    newTaskStatus,
  } = payload;

  if (!lodash.isPlainObject(newData)) {
    return state;
  }

  const mergeData = {
    ...newData,
    ...getReasonGroupVar(oldData),
    reasonDetails: lodash.map(
      lodash.get(newData, 'reasonDetails'),
      (reason: any, reasonIdx: number) => ({
        ...reason,
        ...getReasonDetailVar(lodash.get(oldData, `reasonDetails[${reasonIdx}]`)),
        reasonReminders: lodash.map(
          lodash.get(reason, 'reasonReminders'),
          (reminder: any, reminderIdx: number) => ({
            ...reminder,
            ...getReasonReminderVar(
              lodash.get(oldData, `reasonDetails[${reasonIdx}].reasonReminders[${reminderIdx}]`)
            ),
          })
        ),
      })
    ),
  };

  const { status, id } = newData;
  if (status === EReasonStatus.DRAFT || status === EReasonStatus.ACTIVE) {
    return produce(state, (draftState: any) => {
      lodash.forEach(draftState.currentReasonGroups, (reasonGroup: any, groupIdx: number) => {
        if (reasonGroup?.id === id) {
          const { oldData: filterOldData, newData: filterNewData, ...others }: any = payload;
          draftState.currentReasonGroups[groupIdx] = mergeData;
          if (!lodash.isEmpty(others)) {
            draftState.activityKey = newActivityKey;
            draftState.businessNo = newBusinessNo;
            draftState.caseCategory = newCaseCategory;
            draftState.caseNo = newCaseNo;
            draftState.inquiryBusinessNo = newInquiryBusinessNo;
            draftState.taskId = newTaskId;
            draftState.taskStatus = newTaskStatus;
          }
        }
      });
    });
  }
  return produce(state, (draftState: any) => {
    const { oldData: filterOldData, newData: filterNewData, ...others }: any = payload;
    draftState.currentReasonGroups = lodash.filter(
      draftState.currentReasonGroups,
      (reasonGroup: any, groupIdx: number) => reasonGroup?.id !== id
    );
    draftState.historyReasonGroups.push(mergeData);
    if (!lodash.isEmpty(others)) {
      draftState.activityKey = newActivityKey;
      draftState.businessNo = newBusinessNo;
      draftState.caseCategory = newCaseCategory;
      draftState.caseNo = newCaseNo;
      draftState.inquiryBusinessNo = newInquiryBusinessNo;
      draftState.taskId = newTaskId;
      draftState.taskStatus = newTaskStatus;
    }
  });
}
