import lodash from 'lodash';

import { getRiskIndicator } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const applicationNo = lodash.get(payload, 'applicationNo');
  if (!applicationNo) return;

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
    yield put({
      type: 'setCertificateCRR',
    });
    yield put({
      type: 'setShouldCheckAMLOrCRRHighlight',
    });
  }
}
