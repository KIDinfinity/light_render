export default function* ({ payload, signal = null }: any, { put }: any): Generator<any, any, any> {
  const { categoryCode, duration } = payload || {};

  yield put.resolve({
    type: 'getTaskList',
    payload: {
      categoryCode,
    },
    signal,
  });
}
