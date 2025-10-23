import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import { getAuth } from '@/auth/Utils';
import { getLeaveRequestUserInfo } from '@/services/userCenterUserLeaveRequestControllerService';

export default function* (action: any, { call, put, select }: any) {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  const allUsersAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_InquiryLeaveRequest_AllUsers',
  });

  const subordinatesAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_InquiryLeaveRequest_Subordinates',
  });

  const response = yield call(getLeaveRequestUserInfo, userId);

  let newData = [];
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    const list = response.resultData;

    if (allUsersAuth) {
      newData = list;
    } else if (subordinatesAuth) {
      newData = lodash.filter(list, (item: any) => item.subordinate);
    }

    yield put({
      type: 'saveSubordinateInfo',
      payload: { subordinateList: newData },
    });
  }
  return newData;
}
