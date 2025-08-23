/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { safeParseUtil } from '@/utils/utils';
import { checkSnapshotRight } from 'claim/pages/utils/taskUtils';

export default function* getSnapshot({ payload }: any, { call, put, select }: any) {
  const taskId = lodash.get(payload, 'taskId', '');
  const taskDefKey = lodash.get(payload, 'activityCode');
  const { taskStatus } = yield select((state: any) => state.processTask.getTask);
  const response = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });
  if (checkSnapshotRight(response)) {
    const claimProcessData = safeParseUtil(response.resultData.dataValue);
    claimProcessData.activityKey = taskDefKey;
    yield put({
      type: 'followUpClaim/initFollowUpClaim',
      payload: {
        ...claimProcessData,
        taskStatus,
      },
    });
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
  } else {
    const { businessNo, caseCategory } = payload;
    yield put({
      type: 'getClaim',
      payload: {
        claimNo: businessNo,
        caseCategory,
        taskDefKey,
      },
    });
  }

  return lodash.get(response, 'resultData');
}
