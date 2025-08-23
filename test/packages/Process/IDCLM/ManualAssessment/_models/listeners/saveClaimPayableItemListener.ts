import { NAMESPACE } from '../../activity.config';

export default function* saveClaimPayableItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest([`${NAMESPACE}/saveClaimPayableItem`], function* act(action: any) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload: action.payload,
    });
  });
}
