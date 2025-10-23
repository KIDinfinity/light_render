import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  queryGangedDropdownByMasterField,
} from '@/services/ccSetupControllerService';
import { handlerQueryDropDown } from 'configuration/pages/ConfigurationCenter/Utils/Handle';

export default function* ({ payload }: PayProps, { put, call, select }: SagaProps) {
  const { masterFieldName, functionId, record, current } = payload;
  const { functionData } = yield select((state: any) => state.configurationCenter);
  const response = yield call(queryGangedDropdownByMasterField, {
    functionId,
    masterFieldName,
    record,
  });
  if (response && response.success) {
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
        current: newCurrent,
      },
    });
  }
}
