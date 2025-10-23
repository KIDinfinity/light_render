import lodash from 'lodash';

import { getNotices } from '@/services/navigatorTaskOperationControllerService';

export default function* ({ payload }: any, { call, put }: any): Generator<any, void, any> {
  const { taskDetail } = lodash.pick(payload, ['taskDetail']);
  const {
    processInstanceId: caseNo,
    taskDefKey: activityKey,
    taskId,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
  } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskDefKey',
    'taskId',
    'caseCategory',
    'businessNo',
    'inquiryBusinessNo',
  ]);

  const response = yield call(getNotices, {
    caseNo,
    activityKey,
    taskId,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
  });

  console.log('notices', response);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveWarnNotices',
      payload: {
        warnNotices: resultData,
      },
    });
  }
}
