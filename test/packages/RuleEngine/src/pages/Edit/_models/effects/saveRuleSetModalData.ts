import lodash from 'lodash';
import { queryRuleSetByVersionId } from '@/services/ruleEngineRuleSetControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(queryRuleSetByVersionId, payload.id);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveState',
      payload: {
        ruleSetModalData: {
          ruleSetInfo: response.resultData.ruleSetInfo || {},
          groups: response.resultData.groups || [],
          flowNodeVOs: response.resultData.flowNodeVOs || [],
          branchVOs: response.resultData.branchVOs || [],
        },
        currentRuleSetModalTab: response.resultData.groups?.[0]?.groupId || '',
      },
    });
    yield put({
      type: 'updateModalStatus',
      payload: {
        isRuleSet: true,
      },
    });
  }
}
