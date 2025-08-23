import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

// eslint-disable-next-line func-names
export default function* (_: any, { put, select }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const dataForSubmit: object = yield put.resolve({
    type: 'getDataForSubmit',
  });
  yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.GetInsuredInfo,
  });
}
