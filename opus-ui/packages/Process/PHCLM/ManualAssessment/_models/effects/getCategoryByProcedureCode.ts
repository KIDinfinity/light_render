import lodash from 'lodash';
import claimSurgeryProcedureInformationControllerService from '@/services/claimSurgeryProcedureInformationControllerService';
import { tenant } from '@/components/Tenant';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getCategoryByProcedureCode({ payload }: any, { call, put }: any) {
  const { surgeryCode, procedureId } = payload;
  if (!surgeryCode) return;

  const params = {
    surgeryCode,
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(
    claimSurgeryProcedureInformationControllerService.searchSurgeryInfoByRegionCode,
    objectToFormData(params)
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveProcedureItem',
      payload: {
        changedFields: {
          surgeryCategory: resultData?.surgeryCategory,
          surgeryClass: resultData?.surgeryClass,
        },
        procedureId,
      },
    });
  }
}
