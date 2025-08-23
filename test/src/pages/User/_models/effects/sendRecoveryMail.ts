import { sendRecoveryLinkEmail } from '@/services/loginLogoutControllerService';

export default function* sendRecoveryMail({ payload }: any, { call }: any) {
  const response = yield call(sendRecoveryLinkEmail, {
    ...payload,
  });
  return response;
}
