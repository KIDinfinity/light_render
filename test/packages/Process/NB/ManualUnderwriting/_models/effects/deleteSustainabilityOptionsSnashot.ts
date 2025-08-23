import { deleteData } from '@/services/dcSnapshotService';

export default function* (_: any, { call, select }: any) {
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  yield call(deleteData, {
    taskId: taskDetail?.taskId,
    dataType: 'tempBusinessData',
    businessNo: taskDetail?.businessNo,
  });
}
