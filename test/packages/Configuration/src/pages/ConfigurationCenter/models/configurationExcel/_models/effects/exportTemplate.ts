import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  exportTemplate,
} from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { functionId } = payload;
  const response = yield call(exportTemplate, functionId);
  return response;
}
