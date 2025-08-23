import lodash from 'lodash';
import { loginOktaSSO } from '@/services/loginLogoutControllerService';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { failSsoLogin } from '../functions';

export default function* getOktaSsoLogin({ payload }: any, { call, put }: any) {
  const response = yield call(loginOktaSSO, { ...payload });
  const url = window.location.href;
  const redirectUrl = url.substring(0, url.indexOf('?code'));

  if (lodash.isPlainObject(response) && response?.success) {
    const result = yield put.resolve({
      type: 'saveLoginData',
      payload: {
        response,
        type: Mode.SSO,
      },
    });
    if (result) {
      // 去除参数
      window.location.href = redirectUrl;
    }
  } else {
    failSsoLogin({
      response,
      api: 'loginOktaSSO',
      redirectUrl: redirectUrl,
    });
  }
}
