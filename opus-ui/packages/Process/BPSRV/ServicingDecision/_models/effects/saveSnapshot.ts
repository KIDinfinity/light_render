import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

// eslint-disable-next-line func-names
export default function* (_: any, { put, select, call }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const dataForSubmit: object = yield put.resolve({
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
