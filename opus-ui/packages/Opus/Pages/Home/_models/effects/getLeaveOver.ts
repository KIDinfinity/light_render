import { overview } from '@/services/userCenterUserLeaveRequestControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { ModalTabs } from 'opus/Enums';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';
  const organizationCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode
  ) || '';
  const businessCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessCode
  );

  const { leaveDate, type } = payload || {};
  const paramsMap = {
    [ModalTabs.myTask]: {
      userId,
      leaveDate: moment(leaveDate).format('YYYY-MM-DD'),
      businessCode,
    },
    [ModalTabs.myTeamTask]: {
      userId,
      leaveDate: moment(leaveDate).format('YYYY-MM-DD'),
      organizationCode,
      businessCode,
    },
  };

  const params = paramsMap[type] || {};

  const response = yield call(overview, params);

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isArray(response?.resultData)
  ) {
    yield put({
      type: 'saveLeaveOver',
      payload: {
        leaveOver: response?.resultData,
        type,
      },
    });
  }
}
