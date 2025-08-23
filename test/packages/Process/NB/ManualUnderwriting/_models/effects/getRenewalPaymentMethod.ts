import lodash from 'lodash';
import { getRenewalPaymentMethod } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const params = payload?.params || '';
  const response = yield call(getRenewalPaymentMethod, params);
  yield put({
    type: 'setRenewalPaymentMethod',
    payload: {
      renewalPaymentMethod: lodash.get(response, 'resultData'),
    },
  });
}
