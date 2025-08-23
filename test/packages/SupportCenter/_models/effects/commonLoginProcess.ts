import lodash from 'lodash';
import { history } from 'umi';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import { nativeLogin } from '@/services/loginLogoutControllerService';
import { getPageQuery } from '@/utils/utils';

export default function* commonLoginProcess({ payload }: any, { call, put }: any) {
  const { params } = payload;
  console.log('trigger common login');

  const response = yield call(nativeLogin, params);

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
      type: 'login/saveloginError',
      payload: {
        loginError: response?.resultData,
      },
    });
  }
}
