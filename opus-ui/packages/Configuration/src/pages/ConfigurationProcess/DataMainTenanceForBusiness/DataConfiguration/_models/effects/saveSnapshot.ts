import { saveSnashot } from 'basic/utils/SnapshotTool';

import { EOptionType } from 'basic/enum/EOptionType';

export default function* (_: any, { call, put, select }: any) {
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const dataForSubmit = yield put.resolve({
    type: 'getClaimProcessData',
  });

  if (!dataForSubmit) {
    return;
  }

  const result = yield call(saveSnashot, {
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.Save,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
