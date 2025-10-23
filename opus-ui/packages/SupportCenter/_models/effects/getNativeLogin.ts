import lodash from 'lodash';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { nativeLogin } from '@/services/loginLogoutControllerService';
import { history } from 'umi';
import { getPageQuery } from '@/utils/utils';
import { tenant } from '@/components/Tenant';

export default function* getNativeLogin({ payload }: any, { call, put }: any) {
  const { userId, passKey } = payload;
  const currentRegion = tenant.region();
  console.log('trigger native login');

  const response = yield call(
    nativeLogin,
    {
      userId,
      password: passKey,
      username: userId,
      encryptedPassword: passKey,
    },
    {
      headers: {
        ['X-Tenant']: currentRegion.toLowerCase(),
        ['X-Region']: currentRegion.toUpperCase(),
      },
    }
  );

  if (lodash.isPlainObject(response) && response?.success) {
    const result = yield put.resolve({
      type: 'login/saveLoginData',
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
      history.replace(redirect || '/supportCenter/monitor');
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
