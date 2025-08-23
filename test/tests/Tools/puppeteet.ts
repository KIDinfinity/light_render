import puppeteer from 'puppeteer';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';

export default async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1400,800`],
  });
  const newPage = await browser.newPage();

  return {
    browser,
    page: newPage,
    callClose: () => {
      newPage.close();
      browser.close();
    },
    getOptions: () => {
      return newPage.evaluate(() => {
        const loginRouterRex = new RegExp('user/login');
        const authority = LS.getItem(LSKey.AUTHORITY)?.includes?.('user');
        const url = window.location.href;
        return {
          isLogin: authority || false,
          config: SS.getItem(SSKey.CONFIGS),
          ssoLoginResult: SS.getItem(SSKey.SSOLOGIN_RESULT),
          url,
          loginPage: loginRouterRex.test(url),
          authenPage: new RegExp('Authen.ashx').test(url),
        };
      });
    },
  };
};
