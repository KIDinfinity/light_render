import lodash from 'lodash';
import { getCfgPlanbankInfosByPaymentMode } from '@/services/owbNbCfgControllerService';

export default function* (_, { call, put }: any) {
  const response = yield call(getCfgPlanbankInfosByPaymentMode);
  yield put({
    type: 'setCfgPlanProductOptions',
    payload: {
      cfgPlanProductOptions: lodash.get(response, 'resultData'),
    },
  });
}
