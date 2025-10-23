import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { addRuleToLibrary } from '@/services/ruleEngineRuleLibraryRuleControllerService';

export default function* (action: any, { select, call, put }: any) {
  const { groupId } = action.payload;
  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);
  const paramsList = lodash
    .chain(submitRuleSet)
    .get('groups')
    .find((item: any) => item?.groupId === groupId)
    .get('rules')
    .filter((item: any) => item.checked)
    .map((item: any) => ({
      baseRule: item,
      frontId: item?.id,
      moduleCode: formUtils.queryValue(submitRuleSet?.ruleSetInfo?.moduleCode) || '',
      modulePrefix: submitRuleSet?.ruleSetInfo?.modulePrefix || '',
    }))
    .value();

  if (paramsList.length === 0) return;

  const response: any = yield call(addRuleToLibrary, paramsList);

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isArray(response.resultData) &&
    !lodash.isEmpty(response.resultData)
  ) {
    yield put({
      type: 'addRulesToLibrary',
      payload: {
        groupId,
        libs: response.resultData,
      },
    });
  }
}
