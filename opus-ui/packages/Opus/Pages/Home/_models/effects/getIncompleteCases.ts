import { findUncompletedByUserId } from '@/services/userCenterUserInquiryControllerService';
import lodash from 'lodash';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { extraParams = {} } = payload || {};

  const filterChoice = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskData?.filterChoice
  ) || '';
  const response = yield call(findUncompletedByUserId, {
    ...payload,
    params: {
      ...(payload.params || {}),
      ...filterChoice,
    },
  });

  if (lodash.isPlainObject(response) && !!response?.success) {
    const { rows = [], total = 0, params = {} } = response.resultData || {};
    const { todoCaseCount = 0, pendingCaseCount = 0 } = params;

    yield put({
      type: 'saveIncompletedCases',
      payload: {
        incompleteCases: {
          current: extraParams?.currentPage || 1,
          total,
          todoCaseCount,
          pendingCaseCount,
          list: lodash.map(rows, (item) => ({
            ...item,
            id: item.taskId,
          })),
        },
      },
    });
  }

  return response;
}
