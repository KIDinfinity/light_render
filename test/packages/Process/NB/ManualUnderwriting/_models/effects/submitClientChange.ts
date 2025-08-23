import lodash from 'lodash';
import { submit } from '@/services/navigatorBusinessOperationControllerService';

export default function* (_: any, { put, call, select }: any) {
  const taskDetail = yield select((state: any) => state.manualUnderwriting.taskDetail);
  let dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });
  dataForSubmit = {
    ...dataForSubmit,
    operationType: 'updateClient',
    activityKey: taskDetail?.activityKey,
    businessNo: taskDetail?.businessNo,
    caseCategory: taskDetail?.caseCategory,
    taskId: taskDetail?.taskId,
    caseNo: taskDetail?.processInstanceId,
  };
  const response = yield call(submit, dataForSubmit);
  const { success, resultData } = lodash.pick(response, [
    'success',
    'promptMessages',
    'resultData',
  ]);
  if (success) {
    yield put({
      type: 'setIndentificationModalVisible',
      payload: {
        indentificationModalVisible: false,
      },
    });
    yield put({
      type: 'updateSelectedClientInfo',
      payload: {
        businessData: resultData?.businessData,
      },
    });
  }
  return lodash.merge(response, { taskId: taskDetail?.taskId });
}
