export default function* saveEntry({ target, payload }: any, { put }: any) {
  yield put({
    type: 'sequence/add',
    payload: {
      target,
      payload: {
        ...payload,
        validating: true,
      },
    },
  });

  yield put({
    type: 'saveEntryEnd',
  });
}
