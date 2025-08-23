import { tenant } from '@/components/Tenant';
import { searchNameByRegionCode as diagnosis } from '@/services/claimDiagnosisInformationControllerService';

export default function* getDiagnosisMisDict({ payload }: any, { call, put }: any) {
  const { dictCodes } = payload;
  const regionCode = tenant.region();

  const response = yield call(diagnosis, {
    codes: dictCodes,
    regionCode,
  });

  if (response.success && response.resultData) {
    const dictsOfDiagnosis = response.resultData;

    // 保存理赔数据
    yield put({
      type: 'saveDiagnosisMisDict',
      payload: dictsOfDiagnosis,
    });
  }
  return response;
}
