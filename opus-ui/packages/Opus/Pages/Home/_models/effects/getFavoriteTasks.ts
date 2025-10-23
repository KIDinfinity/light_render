import lodash from 'lodash';

import { saveFavoriteTasks } from '@/services/bpmFavouriteTaskService';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { taskIds = [], myTaskTab, categoryCode } = payload || [];

  const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';

  const response = yield call(
    saveFavoriteTasks,
    lodash
      .chain(taskIds || [])
      .map((taskId: string) => ({
        userId,
        taskId,
      }))
      .value() || []
  );

  if (!!response?.success) {
    yield put({
      type: 'getTaskList',
      payload: {
        categoryCode,
        myTaskTab,
      },
    });
  }
  return response;
}
