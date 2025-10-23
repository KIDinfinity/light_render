import lodash from 'lodash';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'loadingDifferByProduct',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'saveIsExceptLoadingSetup',
      payload: {
        isExceptional: resultData === 'Y',
      },
    });
  }
}
