import lodash from 'lodash';
import { getTask } from '@/services/navigatorTaskOperationControllerService';
import bpm from 'bpm/pages/OWBEntrance';

export default function* (_: any, { call, put, select }: any) {
  const taskId = yield select(({ processTask }: any) => processTask?.getTask?.taskId);
  if (taskId) {
    const response = yield call(getTask, {
      dataType: 'mainPage',
      skipSnapshot: false,
      taskId,
    });
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success && !lodash.isEmpty(resultData?.businessData)) {
      yield put.resolve({
        type: 'saveBizData',
        payload: {
          businessData: resultData?.businessData,
        },
      });
      bpm.buttonAction('save');
    }
  }
}
