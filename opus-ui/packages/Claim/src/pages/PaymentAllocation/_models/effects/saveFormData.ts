import lodash from 'lodash';
const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  function* ({ target, payload }: any, { put, call }: any) {
    yield call(delay, 10);
    yield put({
      type: target,
      payload,
    });
    const { changedFields } = payload;
    if (!lodash.isEmpty(changedFields)) {
      yield put({
        type: 'auditLogController/saveChangedFields',
        payload,
      });
    }

  },
  { type: 'takeLatest' },
];
