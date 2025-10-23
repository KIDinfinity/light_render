
export default [
  function* ({ target, payload }: any, { put, call }: any) {
    yield put({
      type: target,
      payload: {
        ...payload,
      },
    });
  },
];
