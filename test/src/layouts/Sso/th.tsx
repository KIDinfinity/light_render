import PageLoading from '@/components/PageLoading';
import { tenant } from '@/components/Tenant';
import { getEncryptURL } from '@/services/loginLogoutControllerService';
import { SS, SSKey } from '@/utils/cache';
import { getLoginPath } from '@/utils/loginUtils';

import { useDispatch } from 'dva';
import lodash from 'lodash';
import { parse, stringify } from 'qs';
import React, { useEffect, useState } from 'react';

const ThAuthorized = ({ children }: any) => {
  const dispatch = useDispatch();

  const [ready, setReady] = useState(false);

  // 重定向到第三方
  const authorizationJump = async () => {
    const reloadUrl = tenant.loginMode()?.ssoConfig?.reloadUrl;
    let goUrl = getLoginPath();

    if (lodash.size(reloadUrl) > 0) {
      const response = await getEncryptURL(window.location.href, {});

      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response.resultData) &&
        response.resultData.encryptedURL
      ) {
        goUrl = `${reloadUrl}?${stringify({
          url: response.resultData.encryptedURL,
        })}`;
      } else {
        SS.setItem(SSKey.SSOLOGIN_RESULT, {
          success: false,
          message: `SSO login failed!(getEncryptURL error)(response:${response})`,
        });
      }
      window.location.href = goUrl;
    } else {
      SS.setItem(SSKey.SSOLOGIN_RESULT, {
        success: false,
        message: 'sso配置重定向url路径(reloadUrl)出错,请检查配置文件',
      });
      window.location.href = goUrl;
    }
  };

  useEffect(() => {
    const params = parse(window.location.href.split('?')[1]);
    const isParams = params.username && params.domainname && params.expired;
    if (!isParams) {
      authorizationJump();
    } else {
      dispatch({
        type: 'login/getThSsoLogin',
        payload: { params },
      });
      setReady(true);
    }
  }, []);

  return <>{ready ? children : <PageLoading />}</>;
};

export default ThAuthorized;
