import lodash from 'lodash';
import { loginHkSSO } from '@/services/loginLogoutControllerService';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { failSsoLogin } from '../functions';

export default function* getThSsoLogin(_: any, { call, put }: any) {
  const response: any = yield call(loginHkSSO, {});

  if (lodash.isPlainObject(response) && response?.success) {
    const result = yield put.resolve({
      type: 'saveLoginData',
      payload: {
        response,
        type: Mode.SSO,
      },
    });
    if (result) {
      window.location.reload();
    }
  } else {
    failSsoLogin({
      response,
      api: 'loginHkSSO',
      redirectUrl: window.location.href,
    });
  }
}
