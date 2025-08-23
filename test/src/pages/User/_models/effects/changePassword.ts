import { LS, LSKey } from '@/utils/cache';
import { updatePassword } from '@/services/userCenterUserSecurityControllerService';

export default function* changePassword({ payload }: any, { call }: any) {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
  const response = yield call(updatePassword, {
    ...payload,
    userId,
  });
  return response;
}
