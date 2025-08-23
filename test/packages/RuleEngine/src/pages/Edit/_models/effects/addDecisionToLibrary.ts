import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { addBranchToLibrary } from '@/services/ruleEngineRuleLibraryBranchControllerService';

export default function* (action: any, { select, call, put }: any) {
  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);
  const decisionEditData = yield select(
    (state: any) => state.ruleEngineController.decisionEditData
  );

  const paramsList = lodash
    .chain(decisionEditData.branchVO.branchList)
    .filter((codeItem: any) => formUtils.queryValue(codeItem.checked))
    .map((item: any) => {
      // const newItem = lodash.reject(item, ['checked', 'bind']);
      const newItem = formUtils.formatFlattenValue(formUtils.cleanValidateData(item));
      return {
        branch: {
          ...newItem,
        },
        frontId: item.id,
        modulePrefix: formUtils.queryValue(submitRuleSet.ruleSetInfo?.modulePrefix) || '',
        moduleCode: formUtils.queryValue(submitRuleSet.ruleSetInfo?.moduleCode) || '',
      };
    })
    .value();

  if (lodash.isArray(paramsList) && paramsList.length > 0) {
    // TODO：应该把没有用的参数给去掉(bind,checked)
    const response: any = yield call(addBranchToLibrary, paramsList);

    if (
      lodash.isPlainObject(response) &&
      response.success &&
      !lodash.isEmpty(response.resultData)
    ) {
      const list = response.resultData;

      const newDecisionEditData = {
        ...decisionEditData,
        branchVO: {
          ...decisionEditData.branchVO,
          branchList: lodash.map(decisionEditData.branchVO.branchList, (codeItem: any) => {
            const newItem = lodash.find(list, (item: any) => item.frontId === codeItem.id);
            return !lodash.isEmpty(newItem)
              ? {
                  ...codeItem,
                  checked: false,
                  id: newItem.branch.id,
                  binded: '1',
                }
              : codeItem;
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
}
