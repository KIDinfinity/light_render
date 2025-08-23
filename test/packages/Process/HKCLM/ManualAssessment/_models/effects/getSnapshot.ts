/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { checkSnapshotRight } from 'claim/pages/utils/taskUtils';
import { safeParseUtil } from '@/utils/utils';

export default function* getSnapshot({ payload }: any, { call, put }: any) {
  const taskId = lodash.get(payload, 'taskId', '');
  const response = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });

  const taskDetail = yield select((state: any) => state.processTask.getTask || {});

  if (checkSnapshotRight(response)) {
    const claimProcessData = safeParseUtil(response.resultData.dataValue);
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: { ...claimProcessData, ...lodash.pick(taskDetail, ['taskId', 'taskDefKey']) },
    });
  } else {
    const { businessNo, caseCategory } = payload;
    yield put({
      type: 'getClaim',
      payload: {
        claimNo: businessNo,
        caseCategory,
      },
    });
  }

  return lodash.get(response, 'resultData');
}
