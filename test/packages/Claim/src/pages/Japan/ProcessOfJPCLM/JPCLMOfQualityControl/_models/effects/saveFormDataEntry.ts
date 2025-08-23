export default function* saveFormDataEntry(
  { target, payload }: any,
  { put, select, call, takeLatest }: any
) {
  yield put({
    type: 'sequence/add',
    payload: {
      target,
      payload,
    },
  });

  yield put({
    type: 'saveFormDataEntryEnd',
  });
}
