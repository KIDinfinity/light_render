import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import userCenterOrganizationControllerService from '@/services/userCenterOrganizationControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state: any) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const response = yield call(
      userCenterOrganizationControllerService.findMicroInfoByUserId,
      objectToFormData({
        userId,
      })
    );

    if (response?.success) {
      yield put({
        type: 'saveOrganizationInfo',
        payload: {
          organizationInfo: response.resultData,
        },
      });

      return response.resultData;
    }
  }

  return [];
}
