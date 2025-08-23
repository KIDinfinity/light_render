import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getEws } from '@/services/dcProposalControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const applicationNo = lodash.get(payload, 'applicationNo');
  const response = yield call(
    getEws,
    objectToFormData({
      applicationNo,
    })
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setEwsData',
      payload: {
        ewsData: resultData,
      },
    });
  }
}
