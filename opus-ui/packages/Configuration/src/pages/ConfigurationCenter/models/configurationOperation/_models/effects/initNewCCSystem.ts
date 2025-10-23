import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { initNewCCSystem } from '@/services/ccInitControllerService';

export default function* ({ payload }: PayProps, { put, call }: SagaProps) {
  const response = yield call(initNewCCSystem, { ...payload });
  return response;
}
