import lodash from 'lodash';
import claimMedicalProviderInformationControllerService from '@/services/claimMedicalProviderInformationControllerService';
import { tenant } from '@/components/Tenant';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getProviderPlaceByMedicalCode({ payload }: any, { call, put }: any) {
  const { medicalProviderCode, treatmentId, hospitalType } = payload;
  if (!medicalProviderCode) return;

  const params = {
    medicalProviderCode,
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(
    claimMedicalProviderInformationControllerService.searchMedicalProviderPlaceByRegionCode,
    objectToFormData(params)
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveTreatmentItem',
      payload: {
        changedFields: {
          medicalProviderPlace: resultData?.provinceCode,
        },
        treatmentId,
        hospitalType,
      },
    });
  }
}
