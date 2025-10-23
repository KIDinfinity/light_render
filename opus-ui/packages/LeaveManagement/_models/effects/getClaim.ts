import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { safeParseUtil } from '@/utils/utils';

export default function* (_: any, { call, select, put }: any) {
  const { taskId } = yield select((state: any) => state.processTask.getTask);
  const calendarDate = yield select((state: any) => state.leaveManagement.calendarDate);
  const modalTaskId = yield select((state: any) => state.leaveManagement.modalTaskId);

  const snapShot = yield call(queryData, {
    dataType: 'mainPage',
    taskId: taskId || modalTaskId,
  });

  const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'));

  // 兼容旧数据
  if (lodash.some(snapShotData?.details, (d) => d.users)) {
    yield put({
      type: 'saveState',
      payload: {
        businessData: {
          ...snapShotData,
          details: lodash.map(snapShotData.details, (item: any) => {
            return {
              ...item,
              startTime: !lodash.isEmpty(calendarDate)
                ? `${calendarDate} 08:30:00`
                : item.startTime,
              endTime: !lodash.isEmpty(calendarDate) ? `${calendarDate} 18:30:00` : item.endTime,
            };
          }),
        },
      },
    });
  } else {
    yield put({
      type: 'getLeaveList',
    });
  }
}
