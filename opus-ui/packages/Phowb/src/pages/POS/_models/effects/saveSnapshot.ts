import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select, call }: any) {
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const data = yield put.resolve({
    type: 'getDataForSave',
  });

  const result = yield call(saveSnashot, {
    taskDetail,
    optionType: EOptionType.GetInsuredInfo,
    dataForSubmit: data,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
