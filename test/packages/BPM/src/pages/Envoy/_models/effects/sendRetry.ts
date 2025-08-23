import { refreshReasonExtraFunction } from '@/services/envoyReasonInfoControllerService';

function* sendRetry({ payload }: any, { call, put }: any) {
  const { param, updateRetryList } = payload;

  const response = yield call(refreshReasonExtraFunction, param);

  if (response.success && updateRetryList) {
    yield put({
      type: 'getRetryList',
      payload: {
        id: param.reasonGroupId,
        status: param.reasonExecuteType,
      },
    });
  }
}

export default sendRetry;
