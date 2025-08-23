import { NAMESPACE } from '../../activity.config';

export default function* saveClaimProcessDataListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest([`${NAMESPACE}/saveClaimProcessData`], function* action(action) {
    const isHistoryPage = yield select(state => !state.processTask?.getTask?.caseCategory)

    if(!isHistoryPage) {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }

    yield put({
      type: 'formCommonController/saveFormListBGColorByPolicyNoPolicyYear',
      payload: action.payload,
    });
  });
}
