import lodash from 'lodash';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'addressType',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setDefaultCurrentAddressTypeConfig',
      payload: {
        defaultCurrentAddressType: resultData,
      },
    });
  }
}
