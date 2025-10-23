import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';

import { searchIsCIByDiagnosisCode } from '@/services/claimDiagnosisInformationControllerService';

export default function* checkIsCIByDiagnosisCode({ payload }: any, { call, put }: any) {
  const { searchCode, diagnosisId, incidentId } = payload;
  if (!searchCode) return;

  const changedFields = { criticalIllness: 0 };
  const response = yield call(searchIsCIByDiagnosisCode, objectToFormData({ code: searchCode }));
  const isCriticalIllness = lodash.get(response, 'resultData.isCI');

  if (isCriticalIllness === '1') {
    changedFields.criticalIllness = 1;
  } else if (isCriticalIllness === '0') {
    changedFields.criticalIllness = 0;
  }

  yield put({
    type: 'hbOfClaimAssessmentController/saveDiagnosisItem',
    payload: {
      changedFields,
      incidentId,
      diagnosisId,
    },
  });

  return response;
}
