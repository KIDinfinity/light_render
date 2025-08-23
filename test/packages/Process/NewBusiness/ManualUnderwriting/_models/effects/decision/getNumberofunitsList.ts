import lodash from 'lodash';
import { getCfgPlanProductOptions } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const lackCoreCodeList = lodash.get(payload, 'lackCoreCodeList');
  const response = yield call(getCfgPlanProductOptions, lackCoreCodeList);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'setNumberofunitsList',
      payload: {
        numberofunitsList: resultData,
      },
    });
  }
}
