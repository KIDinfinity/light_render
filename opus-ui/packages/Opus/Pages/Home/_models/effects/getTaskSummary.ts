import lodash from 'lodash';

import { myTasksSummary } from '@/services/dcDashboardControllerService';

import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';

  const durationType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDurationType
  ) || '';
  const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

  const response = yield call(myTasksSummary, {
    businessCode,
    userId,
    durationType,
  });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    const { activitySummary = {} } = response?.resultData || {};

    yield put({
      type: 'saveTaskSummary',
      payload: {
        taskSummary: {
          ...response?.resultData,
          activitySummary: lodash
            .chain(lodash.keys(activitySummary))
            .map((key: any) => ({
              key,
              name: formatMessageApi({
                activity: key,
              }),
              value: activitySummary[key],
            }))
            .value(),
        },
      },
    });
  }
}
