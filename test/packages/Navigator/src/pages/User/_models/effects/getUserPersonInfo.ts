import lodash from 'lodash';
import userCenterUserPersonalInfoControllerService from '@/services/userCenterUserPersonalInfoControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const response = yield call(userCenterUserPersonalInfoControllerService.findByUserId, {
      userId,
    });

    if (response?.success && lodash.isPlainObject(response.resultData)) {
      yield put({
        type: 'saveGetUserPersonInfo',
        payload: {
          userPersonInfo: response.resultData,
        },
      });
    }
  }
}
