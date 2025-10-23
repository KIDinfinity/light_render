export default function* ({ payload, signal = null }: any, { put }: any): Generator<any, any, any> {
  const { categoryCode } = payload || {};

  yield put.resolve({
    type: 'getTaskList',
    payload: {
      categoryCode,
    },
    signal,
  });
}
