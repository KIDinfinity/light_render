
export default [
  // eslint-disable-next-line func-names
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
