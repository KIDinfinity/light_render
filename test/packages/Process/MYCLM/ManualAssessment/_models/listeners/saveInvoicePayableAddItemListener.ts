import { NAMESPACE } from '../../activity.config';

export default function* saveInvoicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest(`${NAMESPACE}/saveInvoicePayableAddItem`, function* action(ac) {
    yield put({
      type: 'saveInvoicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
