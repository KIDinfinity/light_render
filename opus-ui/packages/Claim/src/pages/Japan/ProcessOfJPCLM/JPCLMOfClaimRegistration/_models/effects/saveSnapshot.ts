import { saveSnashot } from 'basic/utils/SnapshotTool';

import { EOptionType } from 'basic/enum/EOptionType';

export default function* ({ payload }: any, { call, put }: any) {
  const { processInstanceId, taskId, claimProcessData } = payload;

  const result = yield call(saveSnashot, {
    taskDetail: { processInstanceId, taskId },
    dataForSubmit: claimProcessData,
    optionType: EOptionType.Save,
  });
  if (result?.success && !!result?.versionNo) {
    yield put({
      type: 'task/saveVersion',
      payload: { currentVersion: result?.versionNo },
    });
  }
}
