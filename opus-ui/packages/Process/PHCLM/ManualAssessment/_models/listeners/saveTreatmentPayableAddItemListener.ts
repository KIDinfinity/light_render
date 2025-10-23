import { NAMESPACE } from '../../activity.config';

export default function* saveTreatmentPayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest(`${NAMESPACE}/saveTreatmentPayableAddItem`, function* action(ac) {
    yield put({
      type: 'saveTreatmentPayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
