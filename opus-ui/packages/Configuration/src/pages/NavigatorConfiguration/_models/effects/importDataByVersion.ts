import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { importDataByVersion } from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { fileInfoVO, functionId, totalRecords } = payload;

  const response = yield call(importDataByVersion, {
    fileInfoVO,
    functionId,
    totalRecords,
  });
  return response;
}
