import lodash from 'lodash';
import { queryRuleSetByVersionId } from '@/services/ruleEngineRuleSetControllerService';

export default function* ({ payload }, { call, put }: any) {
  const response = yield call(queryRuleSetByVersionId, payload.value);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        submitRuleSet: {
          ruleSetInfo: response.resultData.ruleSetInfo || {},
          groups: response.resultData.groups || [],
          flowNodeVOs: response.resultData.flowNodeVOs || [],
          branchVOs: response.resultData.branchVOs || [],
        },
      },
    });
    yield put({
      type: 'queryInternationalisedLibrary',
    });
    yield put({
      type: 'getAtomConfig',
    });
  }
}
