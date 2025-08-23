// const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  // eslint-disable-next-line func-names
  function* ({ target, payload }: any, { put }: any) {
    // yield call(delay, 10);
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
  },
  { type: 'takeLatest' },
];
