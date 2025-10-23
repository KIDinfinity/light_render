import lodash from 'lodash';

import { teamSummary } from '@/services/dcDashboardControllerService';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const activityList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.activityList
  ) || [];
  const owner = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.owner) || '';
  const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

  const durationType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.durationType
  ) || '';

  const response = yield call(teamSummary, {
    businessCode,
    owner,
    activityList,
    durationType,
  });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    const activitySummary = response?.resultData?.activitySummary || {};

    yield put({
      type: 'saveTeamSummary',
      payload: {
        teamSummary: {
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
  return response;
}
