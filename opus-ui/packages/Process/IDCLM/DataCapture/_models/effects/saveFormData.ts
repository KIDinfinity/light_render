export default [
  function* saveFormData({ target, payload }: any, { put }: any) {
    yield put({
      type: target,
      payload,
    });

  },
  { type: 'takeLatest' },
];
