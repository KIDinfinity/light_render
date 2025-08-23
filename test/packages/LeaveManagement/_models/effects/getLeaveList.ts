import lodash from 'lodash';
import { getUserLeaveRequestByCaseNo } from '@/services/userCenterUserLeaveRequestControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import defaultLeaveitem from '../../Utils/defaultLeaveitem';

export default function* (action: any, { select, call, put }: any) {
  const { processInstanceId, assignee, taskId, caseCategory } = yield select(
    (state: any) => state.processTask.getTask
  );
  const calendarDate = yield select((state: any) => state.leaveManagement.calendarDate);
  const response = yield call(
    getUserLeaveRequestByCaseNo,
    objectToFormData({ caseNo: processInstanceId })
  );

  const extra = {
    userId: assignee,
    caseNo: processInstanceId,
    currentTaskId: taskId,
    caseCategory,
    status: '',
  };
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    (lodash.isPlainObject(response?.resultData) || !response?.resultData) &&
    !response?.resultData?.details
  ) {
    yield put({
      type: 'saveState',
      payload: {
        businessData: {
          ...extra,
          details: [defaultLeaveitem(processInstanceId, calendarDate)],
        },
      },
    });
  }
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isArray(response?.resultData?.details)
  ) {
    yield put({
      type: 'saveState',
      payload: {
        businessData: {
          ...extra,
          details: response.resultData.details,
        },
      },
    });
  }
}
