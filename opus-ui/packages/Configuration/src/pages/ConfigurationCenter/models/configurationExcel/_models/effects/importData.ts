import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { importData, importDataAndPatch } from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { fileInfoVO, functionId, totalRecords, confirmDataPatch } = payload;
  const params = confirmDataPatch.success
    ? {
        patchContext: confirmDataPatch.resultData,
        qo: {
          fileInfoVO,
          functionId,
          totalRecords,
        },
      }
    : {
        fileInfoVO,
        functionId,
        totalRecords,
      };

  const response = yield call(confirmDataPatch.success ? importDataAndPatch : importData, params);
  return response;
}
