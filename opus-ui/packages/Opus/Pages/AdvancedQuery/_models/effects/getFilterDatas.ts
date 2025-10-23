import { findDropdownList } from '@/services/dcDashboardControllerService';
import lodash from 'lodash';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { fieldName, categoryCode, isHK } = payload || [];

  const filterDatas = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskData?.filterDatas
  ) || [];
  const { userId, businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

  // 判断是否需要请求
  const needRequest = isHK || !lodash.has(filterDatas, fieldName);
  if (needRequest) {
    const response = yield call(findDropdownList, {
      fieldName,
      userId,
      businessCode,
      categoryCode,
    });

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
}
