import lodash from 'lodash';
import { getRiskIndicator } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const applicationNo = payload.applicationNo;
  const response = yield call(getRiskIndicator, {
    applicationNo,
  });
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveRiskIndicatorConfigList',
      payload: {
        riskIndicatorConfigList: response.resultData,
      },
    });
  }
}
