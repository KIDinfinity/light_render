import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { addConditionToLibrary } from '@/services/ruleEngineRuleLibraryConditionControllerService';
import { addResultToLibrary } from '@/services/ruleEngineRuleLibraryResultControllerService';
import { AddType } from '../../Enum';

export default function* (action: any, { select, call, put }: any) {
  const { editData, code } = action.payload;
  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);

  const paramsList = lodash
    .chain(editData)
    .get(code)
    .filter((codeItem: any) => formUtils.queryValue(codeItem.checked))
    .map((item: any) => {
      // const newItem = lodash.reject(item, ['checked', 'bind']);
      const newItem = formUtils.formatFlattenValue(formUtils.cleanValidateData(item));
      return {
        [code === AddType.Conditions ? 'conditionVO' : 'resultVO']: newItem,
        frontId: item.id,
        modulePrefix: formUtils.queryValue(submitRuleSet.ruleSetInfo?.modulePrefix) || '',
        moduleCode: formUtils.queryValue(submitRuleSet.ruleSetInfo?.moduleCode) || '',
      };
    })
    .value();

  if (paramsList.length === 0) return;

  // TODO：应该把没有用的参数给去掉(bind,checked)
  const addToLibraryResponse: any = yield call(
    code === AddType.Conditions ? addConditionToLibrary : addResultToLibrary,
    paramsList
  );

  if (
    lodash.isPlainObject(addToLibraryResponse) &&
    addToLibraryResponse.success &&
    !lodash.isEmpty(addToLibraryResponse.resultData)
  ) {
    const list = addToLibraryResponse.resultData;

    const newEditData = {
      ...editData,
      [code]: editData[code].map((codeItem: any) => {
        const newItem = lodash.find(list, (item: any) => item.frontId === codeItem.id);

        const keys = [code === AddType.Conditions ? 'conditionVO' : 'resultVO'];
        return !lodash.isEmpty(newItem)
          ? {
              ...codeItem,
              checked: false,
              id: newItem[keys].id,
              binded: '1',
            }
          : codeItem;
      }),
    };

    yield put({
      type: 'saveEditData',
      payload: {
        editData: newEditData,
      },
    });
  }
}
