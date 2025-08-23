import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import userCenterUserGeneralInfoControllerService from '@/services/userCenterUserGeneralInfoControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId: string = yield select((state: any) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const response = yield call(
      userCenterUserGeneralInfoControllerService.queryByUserId,
      objectToFormData({ userId })
    );

    if (response?.success && lodash.isPlainObject(response.resultData)) {
      yield put({
        type: 'saveUserGeneralInfo',
        payload: {
          userGeneralInfo: response.resultData,
          userId,
        },
      });
    }

    return response;
  }
}
