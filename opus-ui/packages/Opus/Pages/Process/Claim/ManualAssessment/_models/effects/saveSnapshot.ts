import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select, call }: any) {
  const { payload } = action;
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
    payload,
  });

  const result = yield call(saveSnashot, {
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.Save,
    syncData: true,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
