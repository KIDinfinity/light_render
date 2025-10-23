import lodash from 'lodash';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const codeType = lodash.get(payload, 'codeType');
  const response = yield call(getDefaultValueByCode, {
    codeType,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'saveRegionalDefaultValue',
      payload: {
        codeType,
        defaultValue: resultData,
      },
    });
  }
}
