import lodash from 'lodash';
import { findPlanDictProductListByRegion } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { put, call, select }: any) {
  const taskDetail: any = yield select(({ processTask }: any) => processTask.getTask);
  const response = yield call(findPlanDictProductListByRegion, {
    applicationNo: taskDetail?.businessNo,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setPlanDictProductRegion',
      payload: {
        planDictProductRegion: resultData,
      },
    });
  }
}
