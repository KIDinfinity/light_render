import lodash from 'lodash';
import { queryLibrarys } from '@/services/ruleEngineRuleLibraryRuleControllerService';
import { formUtils } from 'basic/components/Form';
import { getIsNewRule } from '../../Utils';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* (action: any, { call, put, select }: any) {
  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);
  const ruleModules = yield select(
    (state: any) => state.ruleEngineController?.dropDown?.ruleModules
  );
  const moduleCode = formUtils.queryValue(submitRuleSet?.ruleSetInfo?.moduleCode) || '';
  if (!getIsNewRule(moduleCode, ruleModules)) return;

  const response = yield call(queryLibrarys, objectToFormData({ moduleCode }));
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveState',
      payload: {
        libraryList: response.resultData,
      },
    });
  }
}
