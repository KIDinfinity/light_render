import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {  rejectSubmission } from '@/services/ccBpmControllerService';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(rejectSubmission, { ...payload });
  return response;
}
