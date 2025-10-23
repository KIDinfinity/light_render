import { getResources } from '@/services/userCenterUserLeaveControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const organizationCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode
  ) || [];
  const businessCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessCode
  );

  const response = yield call(getResources, {
    businessCode,
    currentTime: moment().format('YYYY-MM-DD HH:mm:SS'),
    organizationCodeList: [organizationCode],
  });

  if (lodash.isPlainObject(response) && !!response?.success) {
    yield put({
      type: 'saveResources',
      payload: {
        resources: response.resultData || [0, 0],
      },
    });
  }

  return response;
}
