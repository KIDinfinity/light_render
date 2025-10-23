import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  listMetadataByDatasource,
} from '@/services/ccBusinessSystemRegistrationControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { datasourceId } = payload;
  const response = yield call(listMetadataByDatasource, {
    datasourceId,
  });
  return response;
}
