import lodash from 'lodash';
import cache, { SS, SSKey } from '@/utils/cache';
import { getLoginPath } from '@/utils/loginUtils';

const defaultResponse = {};

export default ({ url, newRequestUrl, error }: any): void | object => {
  const status = error.name;
  const config = SS.getItem(SSKey.CONFIGS);
  const isOpenSso = config?.loginMode?.ssoConfig?.isOpenSso;

  const bowerUrl = window.location.href;

  if (isOpenSso) {
    if (
      newRequestUrl.match(
        /(workspace\/encryptURL|workspace\/user\/loginThSSO|workspace\/user\/loginHkSSO|workspace\/user\/oktaSSOLogin)/
      )
    ) {
      if (lodash.includes(error, 'Failed to fetch')) {
        SS.setItem(SSKey.SSOLOGIN_RESULT, {
          success: false,
          message: `SSO login failed!(Network problems, please try again later`,
        });
      } else {
        SS.setItem(SSKey.SSOLOGIN_RESULT, {
          success: false,
          message: `SSO login failed!(url:${newRequestUrl};error:${error})(status:${status})`,
        });
      }

      if (bowerUrl.indexOf('?username') > 0) {
        bowerUrl.substring(0, bowerUrl.indexOf('?username'));
      }
      if (bowerUrl.indexOf('?code') > 0) {
        bowerUrl.substring(0, bowerUrl.indexOf('?code'));
      }
      window.location.href = getLoginPath(false, bowerUrl);
    }
  }

  if (status === 401) {
    cache.clear();

    if (bowerUrl.indexOf('summary-page') > 0) {
      window.location.href = getLoginPath(false, bowerUrl);
    } else {
      window.location.reload();
    }
    return defaultResponse;
  }

  if (url.match('/api') && ((status <= 504 && status >= 500) || (status >= 404 && status < 422))) {
    return defaultResponse;
  }
};
