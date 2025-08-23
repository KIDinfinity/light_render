export default function* saveFormData({ target, payload }: any, { put, select }: any) {
  const validating = yield select(
    ({ formCommonController }: any) => formCommonController.validating
  );
  yield put({
    type: 'saveErrorLog',
    target,
    payload
  });

  if (validating) {
    yield put({
      type: 'saveEntry',
      target,
      payload: {
        ...payload,
      },
    });
    return ;
  };

  yield put({
    type: target,
    payload: {
      ...payload,
      validating
    },
  });

  yield put({
    type: 'link',
    payload: {
      ...payload,
    },
  });
}
