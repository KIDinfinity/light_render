import { queryRuleSetByBusinessId } from '@/services/ruleEngineRuleSetControllerService';
import lodash from 'lodash';

export default function* ({ payload }, { call, put }: any) {
  const response = yield call(queryRuleSetByBusinessId, payload);
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
