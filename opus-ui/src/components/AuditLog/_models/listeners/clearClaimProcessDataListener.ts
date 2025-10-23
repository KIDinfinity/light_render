import Config from '../../Config';

export default function* (_: any, { takeLatest, put }: any) {
  yield takeLatest(Config.clearClaim, function* action(_: any) {
    yield put({
      type: 'clearClaimProcessData',
    });
    yield put({
      type: 'clearChangedFields',
    });
    yield put({
      type: 'task/saveVersion',
      payload: {
        currentVersion: undefined,
      },
    });
  });
}
