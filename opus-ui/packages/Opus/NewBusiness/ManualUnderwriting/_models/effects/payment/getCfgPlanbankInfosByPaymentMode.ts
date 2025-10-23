import lodash from 'lodash';
import { getCfgPlanbankInfosByPaymentMode } from '@/services/owbNbCfgControllerService';

export default function* (_, { call, put }: any) {
  const response = yield call(getCfgPlanbankInfosByPaymentMode);

  if (lodash.isPlainObject(response) && !!response.success && lodash.isEmpty(response.success)) {
    yield put({
      type: 'saveCfgPlanProductOptions',
      payload: {
        cfgPlanProductOptions: response.resultData,
      },
    });
  }
}
