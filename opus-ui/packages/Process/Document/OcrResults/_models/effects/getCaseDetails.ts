import lodash from 'lodash';
// import { serialize as objectToFormData } from 'object-to-formdata';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

/**
 * 从task detail中获取case information
 */
export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const { processInstanceId } = payload;
  if(!processInstanceId)
    return;
  const response = yield call(findBizProcess, { processInstanceId });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveCaseDetails',
      payload: {
        caseInfo: resultData || {},
      },
    });
  }
}
