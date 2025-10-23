import { queryGangedDropdownByMasterField } from '@/services/ccSetupControllerService';
import { handlerQueryDropDown } from 'configuration/pages/ConfigurationCenter/Utils/Handle';

export default function* ({ payload }: any, { put, call, select }: any) {
  const { masterFieldName, functionId, record, current } = payload;
  const { functionData } = yield select((state: any) => state.dataConfigurationController);
  const response = yield call(queryGangedDropdownByMasterField, {
    functionId,
    masterFieldName,
    record,
  });
  if (response && response.success && response.resultData) {
    const { newDataField, newCurrent } = handlerQueryDropDown(
      functionData,
      response.resultData,
      current,
      record
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
