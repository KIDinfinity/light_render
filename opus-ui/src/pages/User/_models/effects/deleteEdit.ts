import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import { deleteEditLog } from '@/services/caseMgntTaskControllerService';

export default function* deleteEdit(_: any, { call, select }: any): Generator<any, void, any> {
  const taskDetail: any = yield select(({ processTask }: any) => processTask.getTask);

  const { taskId, assignee } = lodash.pick(taskDetail, ['taskId', 'assignee']);
  const userId = LS.getItem(LSKey.CURRENTUSER)?.userId;

  if (assignee === userId) {
    yield call(deleteEditLog, { taskId });
  }
}
