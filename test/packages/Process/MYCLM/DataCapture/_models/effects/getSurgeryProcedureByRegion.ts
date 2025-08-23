import lodash from 'lodash';
import claimSurgeryProcedureInformationControllerService from '@/services/claimSurgeryProcedureInformationControllerService';
import { tenant } from '@/components/Tenant';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getSurgeryProcedureByRegion({ payload }: any, { call, put }: any) {
  const params = {
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(
    claimSurgeryProcedureInformationControllerService.surgeryProcedureByRegion,
    objectToFormData(params)
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'surgeryProcedureByRegion',
      payload: {
        surgeryProcedureByRegion: resultData,
      },
    });
  }
}
