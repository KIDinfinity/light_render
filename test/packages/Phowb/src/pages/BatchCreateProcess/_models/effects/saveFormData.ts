const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  function* ({ target, payload }: any, { put, call }: any) {
    // yield call(delay, 10);
    yield put({
      type: target,
      payload: {
        ...payload,
      },
    });
  },
  { type: 'takeLatest' },
];
