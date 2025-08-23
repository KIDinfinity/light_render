/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { TaskStatus, eRequireOpenUDMessage } from '../../Enum';

export default function* initBusinessData({ payload }: any, { put }: any) {
  const {
    processInstanceId,
    taskStatus,
    businessNo,
    onOkFn,
    assignee,
    activityCode,
    businessData,
  } = payload;
  yield put({
    type: 'judgmentOfCauseOfIncidentChain',
    payload: businessData,
  });
  yield put({
    type: 'saveClaimProcessData',
    payload: businessData,
  });
  if (
    TaskStatus.Completed !== lodash.toLower(taskStatus) &&
    lodash.includes(lodash.values(eRequireOpenUDMessage), activityCode)
  ) {
    yield put({
      type: 'udMessageController/initUDMessage',
      payload: {
        claimNo: businessNo,
        processInstanceId,
        onOkFn,
        assignee,
      },
    });
  }
  return businessData;
}
