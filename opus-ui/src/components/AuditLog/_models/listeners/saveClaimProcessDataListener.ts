import Config from '../../Config';

export default function* (_: any, { select, takeLatest, put }: any) {
  yield takeLatest(Config.saveClaim, function* action({ type, payload }: any) {
    const { source } = payload;
    const controller = type?.substr(0, type.indexOf('/'));
    const claimProcessData = yield put.resolve({
      type: `${controller}/${Config?.[controller]?.getDataForSave}`,
    });
    //每次触发都清理一次fieldChange,防止切换case还保留前面的fieldChange
    yield put({
      type: 'onFieldChangedListener',
    });
    const taskId = yield select((state: any) => state.processTask?.getTask?.taskId);
    if (taskId) {
      yield put({
        type: 'saveClaimProcessData',
        payload: {
          claimProcessData,
          taskId,
        },
      });
      yield put({
        type: 'saveCurrentController',
        payload: {
          currentController: source ? source : controller,
        },
      });
    }
  });
}
