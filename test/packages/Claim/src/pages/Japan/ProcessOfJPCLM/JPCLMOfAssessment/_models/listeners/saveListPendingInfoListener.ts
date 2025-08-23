export default function* saveListPendingInfoListener(_: any, { put, takeLatest }: any) {
  yield takeLatest('envoyController/saveGroupInfo', function* action({ payload }: any) {
    yield put({
      type: 'truthPendingConfirm',
      payload,
    });
  });
}
