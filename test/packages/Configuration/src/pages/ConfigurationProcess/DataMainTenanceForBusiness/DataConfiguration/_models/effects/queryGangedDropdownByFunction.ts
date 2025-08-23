import lodash from 'lodash';
import { queryGangedDropdownByFunction } from '@/services/ccSetupControllerService';
import { handlerQueryDropDown } from 'configuration/pages/ConfigurationCenter/Utils/Handle';

export default function* (_: PayProps, { put, call, select }: SagaProps) {
  const { functionData, formData, isUpdate } = yield select(
    (state: any) => state.dataConfigurationController
  );
  if (!isUpdate) {
    return;
  }
  const { id: functionId } = functionData;
  const response = yield call(queryGangedDropdownByFunction, {
    functionId,
    record: formData,
  });
  if (response && response.success) {
    const changeFields = lodash.keys(response?.resultData).reduce((arrs: any[], cur: string) => {
      const values = lodash.get(response?.resultData, cur);
      return lodash.concat(arrs, lodash.isArray(values) && values.length ? values : []);
    }, []);

    const { newDataField, newCurrent } = handlerQueryDropDown(
      functionData,
      changeFields,
      formData,
      {}
    );
    yield put({
      type: 'saveFunctionData',
      payload: {
        functionData: {
          ...functionData,
          dataFieldList: newDataField,
        },
      },
    });
    yield put({
      type: 'saveFormData',
      payload: {
        formData: newCurrent,
      },
    });
  }
}
