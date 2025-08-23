import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import PageLoading from '@/components/PageLoading';
import{ v4 as  uuidv4 } from 'uuid';
import { SS, SSKey } from '@/utils/cache';
import { tenant, Region } from '@/components/Tenant';
import { getLoginPath } from '@/utils/loginUtils';
import { parse, stringify } from 'qs';

const OktaAuthorized = () => {
  const dispatch = useDispatch();

  const { oktaClientId, oktaAuthUrl, oktaClientIdForVN, oktaAuthUrlForVN } =
    tenant.loginMode()?.ssoConfig || {};
  const decodeUrl = window.location.href;
  const redirectUrl = `${window.location.origin}/navigator`;

  // 获取okta配置
  const getOktaConfigs = () => {
    let { client_id, authUrl } = tenant.region({
      [Region.VN]: {
        client_id: oktaClientIdForVN,
        authUrl: oktaAuthUrlForVN,
      },
      notMatch: {
        client_id: oktaClientId,
        authUrl: oktaAuthUrl,
      },
    });

    authUrl =
      authUrl !== 'none'
        ? authUrl
        : decodeUrl.match(/uat-/)
        ? 'https://uat-esso.fwd.com/oauth2/v1/authorize?'
        : 'https://esso.fwd.com/oauth2/v1/authorize?';

    return { client_id, authUrl };
  };

  const { client_id, authUrl } = getOktaConfigs();

  // 重定向到第三方
  const authorizationJump = async () => {
    const uid = uuidv4();
    const config = {
      client_id,
      response_type: 'code',
      // code_challenge: uid,
      // code_challenge_method: 'S256',
      scope: 'openid',
      redirect_uri: redirectUrl,
      nonce: 'g5ly497e8ps',
      state: `{"codeChallenge":"${uid}"}`,
    };

    window.location.href = `${authUrl}${stringify(config)}`;
  };

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    const Symbol = decodeUrl.indexOf('?') > 0 ? '?' : decodeUrl.indexOf('#') > 0 ? '#' : '';
    const params: any = parse(decodeUrl.split(Symbol)[1]);

    if (params.error || params.error_description) {
      SS.setItem(SSKey.SSOLOGIN_RESULT, {
        success: false,
        message: params.error_description,
      });
      window.location.href = getLoginPath(false, decodeUrl.substring(0, decodeUrl.indexOf(Symbol)));
    } else if (!(params.code && params.state) && !params.error) {
      authorizationJump();
    } else {
      const codeChallenge = lodash.isString(params?.state)
        ? JSON.parse(params?.state).codeChallenge
        : '';
      dispatch({
        type: 'login/getOktaSsoLogin',
        payload: {
          code: params?.code,
          codeChallenge,
          redirectUrl,
          regionCode: tenant.region(),
        },
      });
    }
  }, []);

  return <PageLoading />;
};

export default OktaAuthorized;
