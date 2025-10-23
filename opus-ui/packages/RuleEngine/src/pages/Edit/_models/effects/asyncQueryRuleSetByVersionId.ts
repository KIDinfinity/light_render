import lodash from 'lodash';
import { asyncRequestQueryRuleSetByVersionId } from '@/services/ruleEngineRuleSetControllerService';

export default function* ({ payload }, { call, put }: any) {
  const response = yield call(asyncRequestQueryRuleSetByVersionId, payload.asyncVersionId);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveAsyncVersionId',
      payload: {
        asyncVersionId: response.resultData,
      },
    });
  }
}
