import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  batchGenerateDataField,
} from '@/services/ccSetupControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { functionIdList } = payload;
  const response = yield call(batchGenerateDataField, [...functionIdList]);
  return response;
}
