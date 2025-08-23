import { addAuditLog } from '@/services/dcAuditService';
import{ v4 as  uuidv4 } from 'uuid';
import moment from 'moment';
import { Action } from '../../Enum';

export default function* ({ payload }: any, { call, select, put }: any) {
  const { action, processInstanceId: caseNo, activityKey, isSave, ...extraData } = payload;

  const { operaor, operatorId, processInstanceId, procActivityKey, taskId } = yield select(
    (state: any) => ({
      operaor: state?.user?.currentUser?.userName,
      operatorId: state?.user?.currentUser?.userId,
      processInstanceId: caseNo || state?.processTask?.getTask?.processInstanceId,
      taskId: extraData?.taskId || state?.processTask?.getTask?.taskId || '',
      procActivityKey: activityKey || state?.processTask?.getTask?.taskDefKey,
    })
  );
  const date =
    !isSave && action === Action.Save
      ? moment().subtract(1, 'seconds').format()
      : moment().format();
  const params = {
    id: uuidv4(),
    operaor,
    operatorId,
    date,
    action,
    ...extraData,
    taskId,
    processInstanceId,
    procActivityKey,
  };
  // paramsList for actiontype=batch assign
  const paramsList = extraData?.selectedRow?.map((item: any) => {
    return {
      id: uuidv4(),
      operaor,
      operatorId,
      date,
      action: Action.BatchAssign,
      formerAssigneeId: item?.assignee,
      formerAssigneeName: item?.assignee,
      beAssignedUserName: extraData?.assigneeName,
      taskId: item?.taskId,
      activityKey: item?.taskDefKey,
      procActivityKey: item?.taskDefKey,
      processInstanceId: item?.caseNo,
    };
  });
  const requestData = extraData?.selectedRow ? paramsList : JSON.stringify(params);
  const response = yield call(addAuditLog, requestData);
  if (response?.success) {
    yield put({
      type: 'navigatorInformationController/saveAuditLogList',
      payload: {
        list: extraData?.selectedRow ? paramsList : [params],
      },
    });
  }
}
