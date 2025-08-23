import lodash from 'lodash';
import { stringify } from 'qs';

import { LS, LSKey } from '@/utils/cache';
import routerConfig from '@/../config/router.config';

import isOpus from './isOpus';

const setLoginPathname = () => {
  LS.setItem(LSKey.LAST_TIME_LOGIN_PATHANME, window.location.pathname);
};

const getLoginPathName = () => {
  return LS.getItem(LSKey.LAST_TIME_LOGIN_PATHANME, false);
};

const getLoginPath = (manu: boolean, redirect?: string) => {
  const lastTimeLoginPathName = getLoginPathName();
  const isRouter = lodash.some(routerConfig, (router: any) =>
    lodash.some(router?.routes, (routerChild) => routerChild?.path === lastTimeLoginPathName)
  );
  const redirectUrl = redirect || window.location.href;
  if (lastTimeLoginPathName && isRouter) {
    return `${lastTimeLoginPathName}?${manu ? '' : stringify({ redirect: redirectUrl })}`;
  }
  return `${isOpus() ? '/opus' : ''}/user/login?${
    manu ? '' : stringify({ redirect: redirectUrl })
  }`;
};

export { setLoginPathname, getLoginPathName, getLoginPath };
