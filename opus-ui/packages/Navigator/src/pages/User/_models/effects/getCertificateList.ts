import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import userCenterUserCertificateControllerService from '@/services/userCenterUserCertificateControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const response = yield call(
      userCenterUserCertificateControllerService.findByUserId,
      objectToFormData({ userId })
    );

    if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
      yield put({
        type: 'saveCertificateList',
        payload: {
          userCertificateList: response.resultData,
        },
      });
    }

    return response;
  }

  return {};
}
