import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { approveSubmission } from '@/services/ccBpmControllerService';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(approveSubmission, { ...payload });
  return response;
}
