import loginLogoutControllerService from '@/services/loginLogoutControllerService';

export default function* resetPasswordByVerCode({ payload }, { call }) {
  const response = yield call(loginLogoutControllerService.resetPasswordByVerCode, {
    ...payload,
  });
  return response;
}
