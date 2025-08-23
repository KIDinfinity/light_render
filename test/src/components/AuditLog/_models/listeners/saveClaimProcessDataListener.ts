import Config from '../../Config';

export default function* (_: any, { select, takeLatest, put }: any) {
  yield takeLatest(Config.saveClaim, function* action({ type }: any) {
    const controller = type?.substr(0, type.indexOf('/'));
    const claimProcessData = yield put.resolve({
      type: `${controller}/${Config?.[controller]?.getDataForSave}`,
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
          currentController: controller,
        },
      });
    }
  });
}
