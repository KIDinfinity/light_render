import lodash from 'lodash';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'checkRule',
  });
  if (lodash.isPlainObject(response) && response.success) {
    yield put({
      type: 'saveCheckRule',
      payload: {
        checkRule: lodash.get(response, 'resultData'),
      },
    });
  }
}
