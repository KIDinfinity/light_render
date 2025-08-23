import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  deleteFunction,
} from '@/services/ccSetupControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const response = yield call(deleteFunction, payload.id);
  return response;
}
