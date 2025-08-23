import { startSyncProcessInstance } from '@/services/bpmProcessInstanceService';

export default function* ({ payload }, { call, put }: any) {
  const response = yield call(startSyncProcessInstance, payload);
  if (response?.success) {
    yield put({
      type: 'global/visitTaskDetail',
      payload: response.resultData,
    });
  }
}
