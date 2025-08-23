import routerConfig from '@/../config/router.config';
import PageLoading from '@/components/PageLoading';
import { prepareNoLogin } from '@/components/Tenant';
// import LoginedLayout from '@/layouts/LoginedLayout';
// import LoginLayout from '@/layouts/LoginLayout';
// import WorkspaceLayout from '@/layouts/WorkspaceLayout';
import ElementModal from '@/utils/theme/elementModal';
// import MessageCenter from '@mc/index';
// import DataPriorityProvider from 'basic/components/DataPriorityContainer/Provider';
// import ExpandProvider from 'basic/components/ExpandableContainer/Provider';
import lodash from 'lodash';
import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation } from 'umi';
import useResize from '@/utils/useResize';
import isSupportCenter from '@/utils/isSupportCenter';

const DataPriorityProvider = lazy(() => import('basic/components/DataPriorityContainer/Provider'));
const ExpandProvider = lazy(() => import('basic/components/ExpandableContainer/Provider'));
const MessageCenter = lazy(() => import('@mc/index'));
const WorkspaceLayout = lazy(() => import('@/layouts/WorkspaceLayout'));
const LoginLayout = lazy(() => import('@/layouts/LoginLayout'));
const LoginedLayout = lazy(() => import('@/layouts/LoginedLayout'));
const SupportCenterLayout = lazy(() => import('@/layouts/SupportCenterLayout'));

export default () => {
  const [ready, setReady] = useState(false);
  useResize();
  const showSupportCenterLayout = isSupportCenter();
  useEffect(() => {
    const t = async () => {
      await prepareNoLogin();

      setReady(true);
    };

    t();
  }, []);
  const { pathname } = useLocation();
  // const pathname = useSelector(({ global }: any) => global.pathname);
  const Layout = useMemo(() => {
    const router: any = lodash.find(routerConfig, (item: any) => {
      if (item.path && item.path !== '/') {
        return pathname && pathname.match(new RegExp(`^${item.path}`, 'i'));
      }
      return false;
    });
    const isLogindLayout = router?.isLogin !== false;
    const isAuthLayout = router?.isAuth !== false;
    const isLoginPath = /login$/i.test(window.location.pathname);

    if (/^\/summary-page/.test(pathname)) {
      return <Outlet />;
    }
    if (router && isLogindLayout && isAuthLayout && !isLoginPath) {
      if (showSupportCenterLayout) {
        return (
          <LoginedLayout>
            <SupportCenterLayout>
              <Outlet />
            </SupportCenterLayout>
          </LoginedLayout>
        );
      }

      return (
        <LoginedLayout>
          <WorkspaceLayout>
            <Outlet />
          </WorkspaceLayout>
        </LoginedLayout>
      );
    }
    if (router && isLogindLayout && !isLoginPath) {
      return (
        <LoginedLayout>
          <Outlet />
        </LoginedLayout>
      );
    }
    return (
      <LoginLayout>
        <Outlet />
      </LoginLayout>
    );
  }, [pathname]);

  return (
    <Suspense fallback={null}>
      <ExpandProvider>
        <DataPriorityProvider>
          <MessageCenter>
            <ElementModal />
            {ready ? <DndProvider backend={HTML5Backend}>{Layout}</DndProvider> : <PageLoading />}
          </MessageCenter>
        </DataPriorityProvider>
      </ExpandProvider>
    </Suspense>
  );
};
