import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import userCenterUserOrganizationControllerService from '@/services/userCenterUserOrganizationControllerService';
import userCenterUserSkillSetControllerService from '@/services/userCenterUserSkillSetControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const [userOrganizationResponse, userSkillSetResponse] = yield [
      call(userCenterUserOrganizationControllerService.findByUserId, objectToFormData({ userId })),
      call(userCenterUserSkillSetControllerService.findSkillByUserId, objectToFormData({ userId })),
    ];

    const userCertificateResponse = yield put({
      type: 'getCertificateList',
    });

    if (
      lodash.isPlainObject(userSkillSetResponse) &&
      userSkillSetResponse.success &&
      lodash.isArray(userSkillSetResponse.resultData) &&
      lodash.isPlainObject(userOrganizationResponse) &&
      userOrganizationResponse.success &&
      lodash.isPlainObject(userOrganizationResponse.resultData) &&
      userCertificateResponse
    ) {
      yield put({
        type: 'saveGetBasicList',
        payload: {
          skillSet: {
            skillTypeList: userSkillSetResponse.resultData,
          },
          organizationList: userOrganizationResponse.resultData,
        },
      });
    }
  }
}
