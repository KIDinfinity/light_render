import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getIsNewRule } from '../../Utils';
import { RuleSetType } from '../../Enum';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash
      .chain(forms)
      .keys()
      .filter((el) => el?.indexOf('FormData') === -1 && el?.indexOf('FormDecisionData') === -1)
      .map((el) => forms[el])
      .value(),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  const graph = yield select((state: any) => state.ruleEngineController.flowGraph);
  if (graph) {
    graph.get('commandManager').execute(graph, 'validate');
    const count = graph.get('validateErrorCount');
    if (count > 0) {
      if (!lodash.isArray(errors)) {
        errors = [];
      }

      new Array(count).fill({}).forEach((item) => {
        errors.push(item);
      });
    }
  }

  // 设置新Flow校验
  if (lodash.isEmpty(errors)) {
    const ruleSetInfo = yield select(
      (state: any) => state.ruleEngineController.submitRuleSet?.ruleSetInfo || {}
    );
    const ruleModules = yield select(
      (state: any) => state.ruleEngineController?.dropDown?.ruleModules
    );
    const ruleSetType = formUtils.queryValue(ruleSetInfo?.ruleSetType || '');
    const moduleCode = formUtils.queryValue(ruleSetInfo?.moduleCode || '');

    if (
      !lodash.isEmpty(moduleCode) &&
      getIsNewRule(moduleCode, ruleModules) &&
      ruleSetType === RuleSetType.RuleFlow
    ) {
      const newFlowErrors = yield put.resolve({
        type: 'validateNewFlow',
      });

      return newFlowErrors;
    }
  }

  return errors;
}
