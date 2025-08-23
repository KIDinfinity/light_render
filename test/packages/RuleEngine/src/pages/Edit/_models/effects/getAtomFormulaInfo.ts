import lodash from 'lodash';
import { getAtomFormulaInfo } from '@/services/ruleEngineRuleFormulaControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* (action: any, { call }: any) {
  const response = yield call(getAtomFormulaInfo, objectToFormData(action.payload));

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return {};
}
