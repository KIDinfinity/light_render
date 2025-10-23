import { asyncRequestQueryRuleSetByBusinessId } from '@/services/ruleEngineRuleSetControllerService';
import lodash from 'lodash';

export default function* ({ payload }, { call, put }: any) {
  const response = yield call(asyncRequestQueryRuleSetByBusinessId, payload);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveAsyncBusinessId',
      payload: {
        asyncBusinesssId: response.resultData,
      },
    });
  }
}
