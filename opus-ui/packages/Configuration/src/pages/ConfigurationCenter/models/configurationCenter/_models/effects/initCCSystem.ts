import { initCCSystem } from '@/services/ccInitControllerService';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(initCCSystem, payload);
  if (response && response.success) {
    yield put({
      type: 'confiugurationMenu/refreshMennu',
    });
  }
  return response;
}
