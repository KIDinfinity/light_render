import { findDropdownList } from '@/services/dcDashboardControllerService';
import lodash from 'lodash';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

import { tenant } from '@/components/Tenant';
import { ModalTabs } from 'opus/Enums';

const prevAbortController = {};
export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { fieldName, categoryCode } = payload || [];

  const { userId, businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

  const modalTab = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalTab);

  const activityList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.activityList
  ) || [];

  const duration = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.durationType
  );

  const taskDurationType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDurationType
  );

  let newDuration = '';

  if (modalTab === ModalTabs.myTeamTask) {
    newDuration = duration;
  }
  if (modalTab === ModalTabs.myTask && tenant.isTH()) {
    newDuration = taskDurationType;
  }

  const preController = prevAbortController[fieldName];
  const abortController = new AbortController();
  if (preController) {
    preController?.abort();
  }
  prevAbortController[fieldName] = abortController;

  const response = yield call(
    findDropdownList,
    {
      activityList,
      fieldName,
      userId,
      businessCode,
      categoryCode,
      duration: newDuration,
    },
    { signal: abortController.signal }
  );

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isArray(response?.resultData)
  ) {
    yield put({
      type: 'saveFilterDatas',
      payload: {
        [fieldName]: response?.resultData,
      },
    });
  }

  return response;
}
