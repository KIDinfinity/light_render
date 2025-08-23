import lodash from 'lodash';
import { findPlanDictProductListByRegion } from '@/services/owbNbCfgControllerService';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { put, call, select }: any) {
  const businessNo: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail?.businessNo
  );
  const response = yield call(findPlanDictProductListByRegion, {
    applicationNo: businessNo,
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
