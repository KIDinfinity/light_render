import { retryAutoUW } from '@/services/owbNbProposalControllerService';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';

export default function* (_: any, { call, put, select }: any) {
  const data = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);
  const dataForSubmit = getSubmitData({
    taskDetail,
    dataForSubmit: data,
    operationType: 'retry',
  });
  const response = yield call(retryAutoUW, dataForSubmit);

  return response;
}
