import '@/utils/keyboard';
import { LS, LSKey } from '@/utils/cache';

declare const window: any;

/**
 * 修改主题
 * @param {String} newTheme 主题参数
 */
export const changeTheme = async (newTheme?: string | null) => {
  const theme = newTheme || LS.getItem(LSKey.THEME, false) || 'dark';
  const { body } = document;
  // 根据主题动态引入文件
  await import(`@/themes/configs/${theme}`).then((res) => {
    window.themeColor = res.default;
  });
  let styleLink: any = document.getElementById('theme-style');

  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    document.body.appendChild(styleLink);
  }

  const themeClass = `body-wrap-${theme}`;
  if (window.umi_plugin_ant_themeHash) {
    const styleSource = `/theme/${theme}-${window.umi_plugin_ant_themeHash[theme]}.css`;
    if (styleLink && styleLink.getAttribute('href') !== styleSource) {
      // 切换 antd 组件主题
      styleLink.href = styleSource;
      // 切换自定义组件的主题
      body.setAttribute('data-class', themeClass);
    }
  }
  LS.setItem(LSKey.THEME, theme);
};

changeTheme();
