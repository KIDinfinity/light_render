import lodash from 'lodash';
import { listPlanProductDuration } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { coreCode, issueAge, submissionDate } = lodash.pick(payload, [
    'coreCode',
    'issueAge',
    'submissionDate',
  ]);

  const response = yield call(listPlanProductDuration, {
    coreCode,
    issueAge,
    submissionDate,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'setPlanProductDuration',
      payload: {
        coreCode,
        issueAge,
        submissionDate,
        productList: resultData,
      },
    });
  }
}
