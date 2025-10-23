import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  deleteDatasource,
} from '@/services/ccBusinessSystemRegistrationControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const response = yield call(deleteDatasource, payload);
  return response;
}
