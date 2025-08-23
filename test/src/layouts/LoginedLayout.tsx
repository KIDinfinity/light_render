import AuthLayout from '@/auth/Layout/AuthLayout';
import AuthRouterLayout from '@/auth/Layout/AuthRouterLayout';
import PageLoading from '@/components/PageLoading';
import Tenant, { tenant } from '@/components/Tenant';
import { getLoginPath } from '@/utils/loginUtils';
import getLoginPathPathName from '@/utils/getLoginPath';
import useManageSiderWorkSpace from '@/_hooks/useManageSiderWorkSpace';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import ServiceSystemWarn from 'serviceSystem/UserWarn';
import { Access, useAccess } from 'umi';
import Title from './components/Title';
import CaseInquireParamsReceive from './LoginedLayout/CaseInquireParamsReceive';
import renderSso from './Sso';
import GuideModal from '@/components/Guidance/Guidance';
import useRefreshSessionToken from '@/_hooks/useRefreshSessionToken';
const Jump = () => {
  let redirect = window.location.href;
  const urlRegion = tenant.getUrlRegion();

  if (urlRegion) {
    redirect = redirect.replace(new RegExp(`/${urlRegion}`, 'i'), '');
  }

  useEffect(() => {
    const loginPathname = getLoginPathPathName();

    if (window.location.pathname !== loginPathname) {
      window.location.href = getLoginPath(false, redirect);
    }
  }, []);

  return <></>;
};

const ConfigInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'workspaceSwitchOn/getAutoTriggerConfig',
    });
  }, []);

  return <></>;
};

const LoginedLayout = (props: any) => {
  const access = useAccess();
  useManageSiderWorkSpace();
  useRefreshSessionToken();

  const ssoRegion = tenant.loginMode()?.ssoConfig?.ssoRegion || [];

  const isOpenSso =
    // true ||
    tenant.loginMode()?.ssoConfig?.isOpenSso && ssoRegion.includes(tenant.region());

  const authorizedComponent = () => {
    if (!isOpenSso) {
      return <Jump />;
    }
    return renderSso(props, Jump);
  };

  const [isAuthReady, setAuthReady] = useState(false);
  const [isTenantReady, setTenantReady] = useState(false);

  return (
    <CaseInquireParamsReceive>
      <Access accessible={!!access.logined()} fallback={authorizedComponent()}>
        <AuthRouterLayout isReady={isAuthReady && isTenantReady}>
          <ServiceSystemWarn />
          <Title />
          <CaseTaskDetail.Provider>
            {isAuthReady && isTenantReady ? props.children : <PageLoading />}
            <GuideModal />
          </CaseTaskDetail.Provider>
        </AuthRouterLayout>
        <Tenant setReady={setTenantReady} />
        <AuthLayout setReady={setAuthReady} />
        <ConfigInit />
      </Access>
    </CaseInquireParamsReceive>
  );
};

export default LoginedLayout;
