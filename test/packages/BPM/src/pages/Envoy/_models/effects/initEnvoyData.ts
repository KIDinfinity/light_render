export default function* initEnvoyData({ signal }: any, { put }: any) {
  yield put.resolve({
    type: 'getEnvoyInfo',
    signal,
  });

  yield put({
    type: 'getReasonConfigs',
    signal,
  });

  yield put({
    type: 'loadEnvoyBatchSendConfig',
    signal,
  });
}
