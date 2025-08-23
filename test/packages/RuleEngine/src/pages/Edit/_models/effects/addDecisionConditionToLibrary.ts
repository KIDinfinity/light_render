import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { addConditionToLibrary } from '@/services/ruleEngineRuleLibraryConditionControllerService';

export default function* (action: any, { select, call, put }: any) {
  const { id } = action.payload;
  const { submitRuleSet, decisionEditData } = yield select(
    (state: any) => state.ruleEngineController
  );

  // branchVO.branchList
  const paramsList = lodash
    .chain(decisionEditData.branchVO?.branchList)
    .find((item: any) => item.id === id)
    .get('conditions')
    .filter((codeItem: any) => formUtils.queryValue(codeItem.checked))
    .map((item: any) => {
      const newItem = formUtils.formatFlattenValue(formUtils.cleanValidateData(item));
      return {
        conditionVO: newItem,
        frontId: item.id,
        modulePrefix: formUtils.queryValue(submitRuleSet.ruleSetInfo?.modulePrefix) || '',
        moduleCode: formUtils.queryValue(submitRuleSet.ruleSetInfo?.moduleCode) || '',
      };
    })
    .value();

  if (paramsList.length === 0) return;

  const response: any = yield call(addConditionToLibrary, paramsList);

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const list = response.resultData;

    const newDecisionEditData = {
      ...decisionEditData,
      branchVO: {
        ...decisionEditData.branchVO,
        branchList: lodash.map(decisionEditData.branchVO.branchList, (branchItem: any) => {
          return branchItem.id === id
            ? {
                ...branchItem,
                conditions: lodash.map(branchItem.conditions, (conditionItem: any) => {
                  const newItem = lodash.find(
                    list,
                    (item: any) => item.frontId === conditionItem.id
                  );
                  return !lodash.isEmpty(newItem)
                    ? {
                        ...conditionItem,
                        checked: false,
                        id: newItem.conditionVO.id,
                        binded: '1',
                      }
                    : conditionItem;
                }),
              }
            : branchItem;
        }),
      },
    };

    yield put({
      type: 'saveDecisionData',
      payload: {
        decisionEditData: newDecisionEditData,
      },
    });
  }
}
