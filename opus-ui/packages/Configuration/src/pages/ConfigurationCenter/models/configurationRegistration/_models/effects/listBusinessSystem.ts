import {
  listBusinessSystem,
} from '@/services/ccBusinessSystemRegistrationControllerService';
import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { call, put, select }: SagaProps) {
  const { pagination } = yield select((state: { registrationController: any; }) => state.registrationController);
  const response = yield call(listBusinessSystem, {
    ...pagination,
    ...payload,
  });
  if (response?.success) {
    yield put({
      type: 'saveBusinessSystem',
      payload: {
        businessSystem: response?.resultData,
      },
    });
  }
}
