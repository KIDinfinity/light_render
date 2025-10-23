import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getAtomUsageList } from '@/services/ruleEngineRuleAtomConfControllerService';
import { tenant } from '@/components/Tenant';
import { getIsNewRule } from '../../Utils';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* (action: any, { call, put, select }: any) {
  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);
  const configData = yield select((state: any) => state.ruleEngineController.configData);
  const ruleModules = yield select(
    (state: any) => state.ruleEngineController?.dropDown?.ruleModules
  );
  const moduleCode = formUtils.queryValue(submitRuleSet?.ruleSetInfo?.moduleCode) || '';

  if (!getIsNewRule(moduleCode, ruleModules)) return;
  const conditionResponse = yield call(
    getAtomUsageList,
    objectToFormData({
      regionCode: tenant.region(),
      moduleCode,
      conditionActivated: 'Y',
    })
  );
  const resultResponse = yield call(
    getAtomUsageList,
    objectToFormData({
      regionCode: tenant.region(),
      moduleCode,
      resultActivated: 'Y',
    })
  );

  const newConfigData = lodash.cloneDeep(configData);

  if (
    lodash.isPlainObject(conditionResponse) &&
    conditionResponse.success &&
    lodash.isPlainObject(conditionResponse.resultData)
  ) {
    const { ruleDomainAtomUsageList } = conditionResponse.resultData;

    newConfigData.atomConditionList = ruleDomainAtomUsageList || [];
  }
  if (
    lodash.isPlainObject(resultResponse) &&
    conditionResponse.success &&
    lodash.isPlainObject(resultResponse.resultData)
  ) {
    const { ruleDomainAtomUsageList } = resultResponse.resultData;

    newConfigData.atomResultList = ruleDomainAtomUsageList || [];
  }
  yield put({
    type: 'saveState',
    payload: {
      configData: newConfigData,
    },
  });
}
