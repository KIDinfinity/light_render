import lodash from 'lodash';
import claimAppealClaimCaseService from '@/services/claimAppealClaimCaseService';

export default function* getAppealRelateCase({ payload }: any, { call, put, select }: any) {
  if (payload === '') {
    yield put({
      type: 'saveAppealRelateCase',
      payload: [],
    });
    yield put({
      type: 'saveSelectedCase',
      payload: '',
    });
    return;
  }
  const response = yield call(claimAppealClaimCaseService.getAppealRelateCase, {
    originalInquiryClaimNo: payload,
  });
  if (response.success) {
    const selectedCase = yield select((state: any) => state.MaAppealCaseController.selectedCase);
    yield put({
      type: 'saveAppealRelateCase',
      payload: response?.resultData,
    });
    if (lodash.some(response?.resultData, (item: any) => item?.caseNo === selectedCase)) {
      yield put({
        type: 'saveSelectedCase',
        payload: '',
      });
    }
  }
}
