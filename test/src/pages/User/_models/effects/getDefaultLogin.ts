import lodash from 'lodash';
import { history } from 'umi';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { login, nativeLogin } from '@/services/loginLogoutControllerService';
import { SS, SSKey } from '@/utils/cache';
import isOpus from '@/utils/isOpus';

import { getPageQuery } from '@/utils/utils';

export default function* getDefaultLogin({ payload }: any, { call, put }: any) {
  const { params, isNewLogin, isProdLogin } = payload;
  const { activeProfile } = SS.getItem(SSKey.CONFIGS);
  const isCallNativeLogin = lodash.includes(activeProfile, '_prod') ? isProdLogin : isNewLogin;

  const response = yield call(isCallNativeLogin ? nativeLogin : login, params);

  if (lodash.isPlainObject(response) && response?.success) {
    const result = yield put.resolve({
      type: 'saveLoginData',
      payload: {
        response,
        type: Mode.ACCOUNT,
      },
    });

    if (result) {
      const urlParams = new URL(window.location.href);
      const params1: any = getPageQuery();
      let { redirect } = params1;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.startsWith('/#')) {
            redirect = redirect.substr(2);
          }
        }
      }
      history.replace(redirect || (isOpus() ? '/opus' : '/'));
    }
  }

  if (
    !response?.success &&
    lodash.isObject(response?.resultData) &&
    !lodash.isEmpty(response?.resultData)
  ) {
    yield put({
      type: 'saveloginError',
      payload: {
        loginError: response?.resultData,
      },
    });
  }
}
