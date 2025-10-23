import { NAMESPACE } from '../../activity.config';

export default function* saveServicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest(`${NAMESPACE}/saveServicePayableAddItem`, function* action(ac) {
    yield put({
      type: 'saveServicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
