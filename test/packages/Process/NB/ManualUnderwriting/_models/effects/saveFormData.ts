const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function* saveFormData({ target, payload }: any, { put, select }: any) {
  // yield call(delay, 10);

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
    },
  });

  yield put({
    type: 'link',
    payload: {
      ...payload,
    },
  });

  // yield put({
  //   type: 'link',
  //   payload: {
  //     ...payload,
  //   },
  // });
}
