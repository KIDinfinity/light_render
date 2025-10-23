import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  updateDataField
} from '@/services/ccSetupControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const response = yield call(updateDataField, {
    ...payload,
  });
  return response;
}

