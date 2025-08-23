import { NAMESPACE } from '../../activity.config';

export default function* saveClaimProcessDataListener(_: any, { put, takeLatest }: any) {
  yield takeLatest([`${NAMESPACE}/saveClaimProcessData`], function* action(action) {
    yield put({
      type: 'updatePayableAmountCallback',
    });
    yield put({
      type: 'formCommonController/saveFormListBGColor',
      payload: action.payload,
    });
  });
}
