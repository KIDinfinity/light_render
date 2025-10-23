import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { submit } from '@/services/ccBpmControllerService';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(submit, { ...payload });
  return response;
}
