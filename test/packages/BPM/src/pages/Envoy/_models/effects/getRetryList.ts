import { serialize as objectToFormData } from 'object-to-formdata';
import { findExtraFunctionsByGroupId } from '@/services/envoyReasonInfoControllerService';

function* getRetryList({ payload }: any, { call, put }: any) {
  const { id, status } = payload;
  const response = yield call(
    findExtraFunctionsByGroupId,
    objectToFormData({ reasonGroupId: id, reasonExecuteType: status })
  );
  // const response = mock;
  if (response.success) {
    yield put({
      type: 'saveRetryList',
      payload: {
        retryList: response.resultData,
        id,
      },
    });
  }
}

export default getRetryList;
