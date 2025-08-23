import lodash from 'lodash';
import { addAtomToLibrary } from '@/services/ruleEngineRuleFormulaControllerService';
import { formUtils } from 'basic/components/Form';

export default function* (action: any, { call, select }: any) {
  const { conditionId } = action.payload;
  const moduleCode = yield select(
    (state: any) => state.ruleEngineController.submitRuleSet?.ruleSetInfo?.moduleCode
  );
  const conditions = yield select((state: any) => state.ruleEngineController.editData.conditions);
  const index = lodash.findIndex(conditions, (item) => item.id === conditionId);
  if (index !== -1) {
    const condition = conditions[index];
    const response = yield call(addAtomToLibrary, {
      atomCode: formUtils.queryValue(condition.atomCode),
      moduleCode: formUtils.queryValue(moduleCode),
      formulaInfo: formUtils.objectQueryValue(condition.formulaInfo),
    });

    return response?.resultData;
  }
  return '';
}
