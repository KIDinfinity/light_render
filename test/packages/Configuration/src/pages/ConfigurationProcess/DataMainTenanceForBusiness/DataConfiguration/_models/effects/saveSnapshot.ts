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

  yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.Save,
  });
}
