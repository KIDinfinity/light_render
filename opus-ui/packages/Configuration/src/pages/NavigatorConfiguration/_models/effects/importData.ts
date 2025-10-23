import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  importData,
  importDataAndPatch,
  asyncImportData,
} from '@/services/ccBusinessDataControllerService';
import { tenant } from '@/components/Tenant';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const { fileInfoVO, functionId, totalRecords, confirmDataPatch, functionCode } = payload;
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

  let service = importData;

  if (confirmDataPatch.success) {
    service = importDataAndPatch;
  }

  if (functionCode === 'Fun_venus_claim_plan_jp_standard_drug_list' && tenant.isJP()) {
    service = asyncImportData;
  }

  const response = yield call(service, params);
  return response;
}
