import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  listFunctionByMetadataId,
} from '@/services/ccSetupControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { metadataId } = payload;
  const response = yield call(listFunctionByMetadataId, {
    metadataId,
  });
  return response;
}
