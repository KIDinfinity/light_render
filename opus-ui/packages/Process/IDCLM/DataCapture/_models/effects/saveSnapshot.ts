import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select, call }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const result = yield call(saveSnashot, {
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.GetInsuredInfo,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
