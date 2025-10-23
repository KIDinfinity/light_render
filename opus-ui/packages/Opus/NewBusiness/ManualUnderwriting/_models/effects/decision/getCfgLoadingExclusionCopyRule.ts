import lodash from 'lodash';
import { getCfgLoadingExclusionCopyRule } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getCfgLoadingExclusionCopyRule);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setLoadingExclusionCopyRule',
      payload: {
        loadingExclusionCopyRule: resultData,
      },
    });
  }
}
