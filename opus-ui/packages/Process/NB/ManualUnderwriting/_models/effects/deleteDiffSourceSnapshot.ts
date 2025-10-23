import { deleteData } from '@/services/dcSnapshotService';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, select }: any) {
  const { businessNo, taskId } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  yield call(deleteData, {
    businessNo,
    dataType: 'diffSource',
    taskId,
  });
}
