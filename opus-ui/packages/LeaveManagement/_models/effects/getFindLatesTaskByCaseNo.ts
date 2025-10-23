import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findLatesTaskByCaseNo } from '@/services/bpmProcessTaskService';

export default function* (action: any, { select, call, put }: any) {
  const { caseNo, dateTime } = action.payload;
  const modalTaskId = yield select((state: any) => state.leaveManagement.modalTaskId);

  const response = yield call(
    findLatesTaskByCaseNo,
    objectToFormData({
      caseNo,
    })
  );
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const taskId = lodash.get(response, 'resultData.taskId', '');
    if (modalTaskId === taskId) {
      yield put({
        type: 'updateCalendarInfoList',
        payload: {
          dateTime,
        },
      });
    } else {
      yield put({
        type: 'saveState',
        payload: {
          modalTaskId: taskId,
        },
      });
    }
  }
}
