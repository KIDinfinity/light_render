import React from 'react';
import style from './ChangeTheme.less';
import light from '@/themes/configs/light';
import dark from '@/themes/configs/dark';
import { LS, LSKey } from '@/utils/cache';

declare const window: any;

export default ({ change }: any) => {
  let theme1 = false;

  return (
    <div
      className={style.color}
      onClick={() => {
        let styleLink: any = document.getElementById('theme-style');
        let body = document.body;

        if (styleLink) {
          if (theme1) {
            styleLink.href = '/theme/dark.css'; // 切换 antd 组件主题
            body.setAttribute('data-class', 'body-wrap-dark'); // 切换自定义组件的主题
            LS.setItem(LSKey.THEME, 'dark');
            window.themeColor = dark;
          } else {
            styleLink.href = '/theme/light.css';
            body.setAttribute('data-class', 'body-wrap-light');
            LS.setItem(LSKey.THEME, 'light');
            window.themeColor = light;
          }
          theme1 = !theme1;
        }
      }}
    >
      改变主题
    </div>
  );
};
