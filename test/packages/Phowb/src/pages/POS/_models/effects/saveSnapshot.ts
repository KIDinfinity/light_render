import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select }: any) {
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const data = yield put.resolve({
    type: 'getDataForSave',
  });

  yield saveSnashot({
    taskDetail,
    optionType: EOptionType.GetInsuredInfo,
    dataForSubmit: data,
  });
}
