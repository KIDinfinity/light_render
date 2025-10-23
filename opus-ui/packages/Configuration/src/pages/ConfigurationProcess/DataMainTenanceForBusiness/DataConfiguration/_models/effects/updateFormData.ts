import lodash from 'lodash';
import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* ({ payload = {} }: any, { put, select }: any) {
  const { functionData } = yield select((state: any) => state.dataConfigurationController);
  const { formData, changedValues } = payload;
  const fieldKey = lodash.keys(changedValues)[0];
  const connectField = lodash
    .chain(functionData)
    ?.get('gangedDropdownList')
    ?.value()
    ?.filter((item: any) => item.fieldName === fieldKey);

  if (
    connectField &&
    connectField.length > 0 &&
    lodash.keys(changedValues).length === 1 &&
    !changedValues[fieldKey].dirty
  ) {
    // 级联下拉
    yield put({
      type: 'queryGangedDropdownByMasterField',
      payload: {
        current: formData,
        functionId: functionData?.id,
        masterFieldName: connectField?.[0]?.fieldName,
        record: {
          ...tranferResult(functionData?.dataFieldList, formData, true),
        },
      },
    });
  } else {
    yield put({
      type: 'saveFormData',
      payload: {
        formData,
      },
    });
  }

  yield put({
    type: 'updateMultiple',
  });
}
