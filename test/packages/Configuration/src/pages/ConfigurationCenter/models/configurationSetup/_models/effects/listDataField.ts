import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  listDataField,
} from '@/services/ccSetupControllerService';

export default function* ({ payload }: PayProps, { call, put }: SagaProps) {
  const { functionId } = payload;
  const response = yield call(listDataField, {
    functionId,
  });
  if (response?.success) {
    const dataField = response?.resultData;
    const structure = {};
    yield put({
      type: 'saveDataField',
      payload: {
        dataField: {
          ...dataField,
          structure,
        },
      },
    });
  }
}

