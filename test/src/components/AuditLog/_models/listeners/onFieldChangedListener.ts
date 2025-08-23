import Config from '../../Config';

export default function* (_: any, { takeLatest, put }: any) {
  yield takeLatest(Config.onFieldChange, function* action({ payload }: any) {
    yield put({
      type: 'saveChangedFields',
      payload,
    });
  });
}
