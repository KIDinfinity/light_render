import loginLogoutControllerService from '@/services/loginLogoutControllerService';

export default function* sendVerCodeEmail({ payload }, { call }) {
  const response = yield call(loginLogoutControllerService.sendVerCodeEmail, {
    ...payload,
  });
  return response;
}
