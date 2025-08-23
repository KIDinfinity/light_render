import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from '../../activity.config';
import SnapshotCheckVersionModal from 'claim/utils/SnapshotCheckVersionModal';

export default function* (_: any, { put, call, select }: any) {
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSave',
  });
  const diffSource = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.diffSource
  );

  const { success, versionNo, userName } =
    (yield put.resolve({
      type: 'task/checkVersion',
      payload: { taskId: taskDetail?.taskId },
    })) || {};
  if (!success) {
    yield SnapshotCheckVersionModal({ versionNo, userName });
  }

  yield saveSnashot({
    taskDetail,
    dataForSubmit: diffSource,
    optionType: EOptionType.diffSource,
    dataType: 'diffSource',
  });

  const result = yield saveSnashot({
    taskDetail,
    dataForSubmit,
    optionType: EOptionType.GetInsuredInfo,
    dataType: 'businessData',
    syncData: true,
  });
  yield put({
    type: 'task/updateVersion',
    payload: { taskId: taskDetail?.taskId },
  });

  return result;
}
