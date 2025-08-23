const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function* (
  { target, payload }: any,
  { put, call, select }: any
): Generator<any, any, any> {
  yield call(delay, 10);
  const validating = yield select(
    ({ formCommonController }: any) => formCommonController.validating
  );
  if (validating) {
    yield put({
      type: 'saveEntry',
      target,
      payload: {
        ...payload,
        validating,
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
  yield put({
    type: 'link',
    payload: {
      ...payload,
      validating,
    },
  });
}
