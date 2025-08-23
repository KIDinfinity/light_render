import lodash from 'lodash';
import { retrieveSimpleDisease } from '@/services/claimDiagnosisControllerService';
import { tenant } from '@/components/Tenant';

export default function* getSimpleDiseaseFlagByDiagonosis({ payload }: any, { put, call }: any) {
  const { incidentId, diagnosisId, diagonosisCode } = payload;

  const response = yield call(retrieveSimpleDisease, {
    codes: [diagonosisCode],
    regionCode: tenant.region(),
  });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    const simpleDisease = response?.resultData?.[diagonosisCode] || 0;

    yield put({
      type: 'saveDiagnosisItem',
      payload: {
        changedFields: {
          simpleDisease: simpleDisease,
        },
        incidentId,
        diagnosisId,
      },
    });
  }
}
