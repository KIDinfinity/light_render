import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getCommonAuthorityByUserId } from '@/services/rbac2CommonAuthorityControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { LS, LSKey } from '@/utils/cache';

export default function* (_: any, { put, call }: any) {
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  if (userInfo && userInfo?.userId) {
    const response = yield call(
      getCommonAuthorityByUserId,
      objectToFormData({ userId: userInfo?.userId })
    );
    if (response && response.success) {
      const commonAuthorityArrays = response?.resultData || [];
      yield put({
        type: 'saveCommonAuthorityList',
        payload: {
          commonAuthorityList: commonAuthorityArrays,
          authorityCodeList: lodash
            .chain(commonAuthorityArrays)
            .filter((item: any) => item.result)
            .map((item: any) => item.authorityCode)
            .uniq()
            .value(),
        },
      });
    } else {
      handleMessageModal(response?.promptMessages);
    }
  }
}
