export default function* saveFormData({ target, payload }: any, { put, select }: any) {
  const validating = yield select(
    ({ formCommonController }: any) => formCommonController.validating
  );
  if (validating) {
    yield put({
      type: 'saveEntry',
      target,
      payload: {
        ...payload,
      },
    });
    return;
  }

  yield put({
    type: target,
    payload: {
      ...payload,
      validating,
    },
  });
}
