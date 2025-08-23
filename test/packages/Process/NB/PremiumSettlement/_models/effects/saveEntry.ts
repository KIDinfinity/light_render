
export default function* saveEntry({ target, payload }: any, { put }: any) {
  yield put({
    type: 'sequence/add',
    payload: {
      target,
      // namespace: NAMESPACE,
      payload: { ...payload, validating: true },
    },
  });

  yield put({
    type: 'saveEntryEnd',
  });
}
