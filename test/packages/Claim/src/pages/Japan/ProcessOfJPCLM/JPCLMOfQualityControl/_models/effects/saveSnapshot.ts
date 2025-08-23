import { saveSnashot } from 'basic/utils/SnapshotTool';

import { EOptionType } from 'basic/enum/EOptionType';

export default function* ({ payload }: any, { call, put, select }: any) {
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const dataForSubmit = yield put.resolve({
    type: 'getClaimProcessData',
  });
  yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.Save,
  });
}
