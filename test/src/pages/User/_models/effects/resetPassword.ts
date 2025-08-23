import { resetPassword } from '@/services/loginLogoutControllerService';

export default function* esetPassword({ payload }, { call }) {
  const response = yield call(resetPassword, {
    ...payload,
  });
  return response;
}
