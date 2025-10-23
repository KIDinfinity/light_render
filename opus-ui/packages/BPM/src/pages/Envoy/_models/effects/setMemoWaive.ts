import lodash from 'lodash';
import { waivePendingMemo } from '@/services/envoyReasonInfoControllerService';

function* setMemoWaive({ payload }: { payload: { pendingMemoId: string; groupId: any; } }, { call, put, select }: any) {
  const { pendingMemoId, groupId } = payload;

  const response = yield call(waivePendingMemo, { pendingMemoId })

  if (lodash.isPlainObject(response) && response?.success) {
    const currentReasonGroups = yield select((state: any) => state.envoyController.currentReasonGroups)
    yield put.resolve({
      type: 'updateEnvoyData',
      payload: {
        oldData: lodash.chain(currentReasonGroups).find({
          id: groupId
        }).value(),
        newData: response.resultData,
      }
    })
  }
}

export default setMemoWaive;
