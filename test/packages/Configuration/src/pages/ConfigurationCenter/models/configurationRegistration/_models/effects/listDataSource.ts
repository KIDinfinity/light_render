import {
  listDatasoure,
} from '@/services/ccBusinessSystemRegistrationControllerService';
import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { call, put, select }: SagaProps) {
  const { registrationId } = yield select((state: { registrationController: any; }) => state.registrationController);
  const response = yield call(listDatasoure, {
    registrationId,
    ...payload,
  });
  if (response?.success) {
    yield put({
      type: 'saveDataSource',
      payload: {
        dataSource: response?.resultData,
      },
    });
  }
}
