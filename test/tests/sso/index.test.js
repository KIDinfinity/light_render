// @ts-nocheck
// import puppeteet from '../Tools/puppeteet';
import mockRequest from './server';
import {loginRouterRex} from './regex';
import { parse } from 'qs';
const lodash = require('lodash');

const delay = (time) => new Promise((resolve) => setTimeout(() => {
  resolve();
}, time))

describe('sso', () => {

//   it('测试登陆路由', async () => {

//     const {page,callClose} = await puppeteet()

//     await page.goto('http://localhost:8000/user/login');

//     const loginPage = loginRouterRex.test(page.url());

//     expect(loginPage).toBeTruthy()
//     await callClose()
//   });

  // it('用户没权限->非sso->跳转到登录页', async () => {

  //   const {page,getOptions,callClose} = await puppeteet()

  //   await mockRequest({page})

  //   await page.goto('http://localhost:8000/');

  //   const {isLogin,config,loginPage} =await getOptions();
  //   const openSso = config?.loginMode?.ssoConfig?.isOpenSso;
  //   if(!isLogin && !openSso && loginPage){
  //       await delay(3000);
  //       await callClose()
  //   }

  // });

  // it('sso->没有重定向url->跳转到登录页(登录页提示错误)', async () => {

  //   const {page,getOptions,callClose} = await puppeteet()

  //   await mockRequest({page})

  //   await page.goto('http://localhost:8000/navigator');

  //   // 为了等跳转到登录页后再测试
  //   await delay(3000);

  //   const {isLogin,url,config,loginPage,ssoLoginResult} = await getOptions();
  //   const openSso = config?.loginMode?.ssoConfig?.isOpenSso;
  //   const params = parse(url.split('?')[1]);
  //   const isParams = params.username && params.domainname && params.expired;

  //   if(!isLogin && openSso && loginPage && !isParams ){

  //        const message = ssoLoginResult?.message;

  //       expect(message).toBe('sso配置重定向url路径(reloadUrl)出错,请检查配置文件')
  //       await delay(3000);
  //       await callClose()
  //   }

  // });

  // it('sso->重定向到第三方成功', async () => {

  //   const {page,getOptions,callClose} = await puppeteet()

  //   await mockRequest({page})

  //   await page.goto('http://localhost:8000/navigator');

  //   // 为了等跳转到鉴权页后再测试
  //   await delay(2000);


  //   const {isLogin,url,authenPage,config} = await getOptions();
  //   const openSso = config?.loginMode?.ssoConfig?.isOpenSso;
  //   const params = parse(url.split('?')[1]);
  //   const isParams = params.username && params.domainname && params.expired;

  //   if(!isLogin && openSso && !isParams && authenPage ){
  //       callClose()
  //   }

  //   });

    // it('sso->登陆sso->登陆失败', async () => {

    //     const {page,getOptions,callClose} = await puppeteet()

    //     await mockRequest({page})

    //     await page.goto('http://localhost:8000/navigator?username=aa&domainname=bb&expired=cc');

    //     await delay(3000);
    //     const {loginPage,ssoLoginResult} = await getOptions();
    //     if(loginPage){
    //         const success = ssoLoginResult?.success;
    //         expect(success).toBeFalsy();
    //         await delay(3000);
    //         callClose();
    //     }


    //     });

        // it('sso->登陆sso->成功', async () => {

        //     const {page,getOptions,callClose} = await puppeteet()

        //     await mockRequest({page})

        //     await page.goto('http://localhost:8000/navigator?username=aa&domainname=bb&expired=cc');
        //     await delay(2000);

        //     const {isLogin} = await getOptions();
        //     expect(isLogin).toBeTruthy();
        //     callClose();

        //     });

        // 测试hksso
        // it('sso->登陆hksso->成功', async () => {

        //     const {page,getOptions,callClose} = await puppeteet()

        //     await mockRequest({page})

        //     await page.goto('http://localhost:8000/navigator');

        //     const {isLogin} = await getOptions();
        //     expect(isLogin).toBeTruthy();
        //     callClose();

        //     });

});
