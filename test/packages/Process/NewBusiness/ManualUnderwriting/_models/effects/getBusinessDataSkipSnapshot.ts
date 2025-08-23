import lodash from 'lodash';
import { getTask } from '@/services/navigatorTaskOperationControllerService';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* getBusinessDataSkipSnapshot(_: any, { call, put, select }: any) {
  const taskId = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail?.taskId
  );
  if (taskId) {
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: true,
      taskId,
    });
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      yield put.resolve({
        type: 'saveBizData',
        payload: {
          resultData: resultData,
        },
      });
    }
    return response;
  }
  return null;
}
