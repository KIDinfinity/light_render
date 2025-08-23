import lodash from 'lodash';
import { getQuestions } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, { call, put }: any): any {
  const businessNo = lodash.get(payload, 'businessNo');
  const response = yield call(getQuestions, {
    businessNo,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData?.businessData)) {
    yield put({
      type: 'setClientsQuestionnaire',
      payload: {
        clientsQuestionnaire: resultData.businessData,
      },
    });
  }
}
