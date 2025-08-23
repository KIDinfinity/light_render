import lodash from 'lodash';
import { deployByExcel } from '@/services/ruleEngineRuleDeployControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { groupId, list } = payload;
  const moduleCode = yield select(
    (state: any) => state.ruleEngineController.submitRuleSet?.ruleSetInfo?.moduleCode
  );

  const response = yield call(deployByExcel, {
    moduleCode: formUtils.queryValue(moduleCode),
    regionCode: tenant.remoteRegion(),
    uploadRulesList: list,
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'addGroups',
      payload: {
        list: response.resultData.map((item) => ({
          ...item,
          id: uuidv4(),
          conditions: item.conditions.map((conditionItem) => ({ ...conditionItem, id: uuidv4() })),
          results: item.results.map((resultItem) => ({ ...resultItem, id: uuidv4() })),
        })),
        groupId,
      },
    });
    yield put({
      type: 'saveSnapshot',
    });
  }
}
