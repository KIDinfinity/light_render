import lodash from 'lodash';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

export default function* ({ payload }: any, { call, put }: any) {
  const caseNo = lodash.get(payload, 'caseNo');
  if(!caseNo)
    return;
  const response = yield call(findBizProcess, {
    processInstanceId: caseNo,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setCaseDetail',
      payload: {
        caseDetail: resultData,
      },
    });
  }
}
