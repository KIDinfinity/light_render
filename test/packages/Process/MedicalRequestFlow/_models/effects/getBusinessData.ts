import lodash from 'lodash';
import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* getBusinessData({ payload }: any, { call, put }: any) {
  const { caseNo, taskId } = lodash.pick(payload?.taskDetail, ['caseNo', 'taskId']);
  const response: any = yield call(getTask, {
    dataType: 'mainPage',
    skipSnapshot: true,
    taskId,
  });
  if (response.success && response.resultData) {
    const payloadData = (() => {
      const data = {};
      if (!lodash.isEmpty(response.resultData?.businessData)) {
        lodash.set(data, 'originBusinessData', response.resultData?.businessData);
      } else {
        lodash.set(data, 'originBusinessData', {});
      }
      if (!lodash.isEmpty(caseNo)) {
        lodash.set(data, 'caseNo', caseNo);
      }
      return data;
    })();
    yield put({
      type: 'saveData',
      payload: payloadData,
    });
  }
}
