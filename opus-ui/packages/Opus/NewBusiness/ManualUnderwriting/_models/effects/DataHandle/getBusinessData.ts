export default function* ({ payload }: any, { put }: any): Generator<any, any, any> {
  const response = yield put.resolve({
    type: 'getTouchResult',
    payload,
  });

  return response?.resultData?.businessData || {};
}
