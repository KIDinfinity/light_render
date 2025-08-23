import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (_: any, { select, put, call }: any) {
  const taskDetail = yield select((state: any) => ({
    taskId: state?.processTask?.getTask,
  }));
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  yield saveSnashot({
    dataForSubmit,
    taskDetail,
    optionType: EOptionType.SaveClaimProcessDataListener,
  });
}
