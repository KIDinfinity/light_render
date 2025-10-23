import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (_: any, { select, put, call }: any) {
  const taskDetail = yield select((state: any) => ({
    taskId: state?.processTask?.getTask,
  }));
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const result = yield call(saveSnashot, {
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.SaveClaimProcessDataListener,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
