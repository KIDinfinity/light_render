import claimAppealClaimCaseService from '@/services/claimAppealClaimCaseService';

export default function* copyOriginalCase({ payload }: any, { call, put }: any) {
  const response = yield call(claimAppealClaimCaseService.copyOriginalCase, payload);

  if (response.success) {
    yield put({
      type: 'saveClaimAppealOriginalCase',
      payload: response.resultData,
    });
  } else {
    yield put({
      type: 'saveSelectedCase',
      payload: '',
    });
  }
}
