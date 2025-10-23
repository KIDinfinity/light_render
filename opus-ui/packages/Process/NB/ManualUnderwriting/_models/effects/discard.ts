import lodash from 'lodash';
import { deleteData } from '@/services/dcSnapshotService';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { call, select }: any) {
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const response = yield call(deleteData, {
    taskId: taskDetail?.taskId,
    dataType: 'businessData',
    businessNo: taskDetail?.businessNo,
  });
  return lodash.merge(response, { taskId: taskDetail?.taskId });
}
