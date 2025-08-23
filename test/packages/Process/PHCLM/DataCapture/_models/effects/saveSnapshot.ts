import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { put, select }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);

  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const data = yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.GetInsuredInfo,
  });

  yield put({
    type: 'task/saveVersion',
    payload: {
      currentVersion: data.versionNo,
    },
  });
}
