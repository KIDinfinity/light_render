import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.GetInsuredInfo,
  });
}
