import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default function* getClaim(action: any, { call, put, select }: any) {
  const taskId = yield select(({ processTask }: any) => processTask?.getTask?.taskId);

  const requestParam = {
    dataType: 'mainPage',
    skipSnapshot: true,
    taskId,
  };

  const response = yield call(getTask, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'originClaimProcessData',
      payload: claimProcessData,
    });
    yield put({
      type: 'paymentAllocation/saveOriginClaimProcessData',
      payload: { claimProcessData: response.resultData?.businessData },
    });
  }
  return response;
}
