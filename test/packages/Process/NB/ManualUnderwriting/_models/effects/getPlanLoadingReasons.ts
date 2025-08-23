import lodash from 'lodash';
import { getPlanLoadingReasons } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getPlanLoadingReasons);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setPlanLoadingReasons',
      payload: {
        planLoadingReasons: resultData,
      },
    });
  }
}
