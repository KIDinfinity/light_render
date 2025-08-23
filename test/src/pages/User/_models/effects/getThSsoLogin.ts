import lodash from 'lodash';
import { loginTHSSO } from '@/services/loginLogoutControllerService';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { failSsoLogin } from '../functions';

export default function* getThSsoLogin({ payload }: any, { call, put }: any) {
  const response = yield call(loginTHSSO, { ...payload.params });

  const url = window.location.href;
  const redirectUrl = url.substring(0, url.indexOf('?username'));

  if (lodash.isPlainObject(response) && response?.success) {
    const result = yield put.resolve({
      type: 'saveLoginData',
      payload: {
        response,
        type: Mode.SSO,
      },
    });

    if (result) {
      window.location.href = redirectUrl;
    }
  } else {
    failSsoLogin({
      response,
      api: 'loginTHSSO',
      redirectUrl,
    });
  }
}
