import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import lodash from 'lodash';
import {
  tranferResult,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { functionData, currentMenu } = yield select((state: any) => ({
    ...state.configurationCenter,
    ...state.configurationMenu,
  }));
  const { current, changedValues } = payload;
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
    yield put({
      type: 'changeLoadingOfDropDown',
      payload: {
        functionData,
        loading: true,
        connectField,
      },
    });
    yield put({
      type: 'queryGangedDropdownByMasterField',
      payload: {
        current,
        functionId: currentMenu.id,
        masterFieldName: connectField[0].fieldName,
        record: {
          ...tranferResult(functionData.dataFieldList, current, true),
        },
      },
    });
    yield put({
      type: 'changeLoadingOfDropDown',
      payload: {
        functionData,
        loading: false,
        connectField,
      },
    });
  } else {
    yield put({
      type: 'saveCurrent',
      payload: {
        current,
      },
    });
  }
}
