import { searchNameByRegionCode as diagnosis } from '@/services/claimDiagnosisInformationControllerService';

export default function* getDiseaseName({ payload }: any, { call, put }: any) {
  const response = yield call(diagnosis, payload);
  if (response && response.success) {
    yield put({
      type: 'saveDiseaseNameList',
      payload: {
        diseaseNameList: response?.resultData,
      },
    });
  }
}
