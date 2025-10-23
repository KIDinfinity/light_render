import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

export default {
  namespace: 'theme',
  state: {
    themeList: [
      {
        name: 'dark',
        title: 'Dark',
      },
      {
        name: 'light',
        title: 'Light',
      },
      {
        name: 'news',
        title: 'News',
      },
      {
        name: 'opus',
        title: 'Opus',
      },
    ],
    activeTheme: '',
    originActiveTheme: '',
  },
  reducers: {
    initTheme(state: any, action: any) {
      const { themeList: oldThemeList } = state;
      const themeList = lodash.get(action, 'payload.themeList', []);
      const activeTheme = lodash.get(action, 'payload.activeTheme', '');
      const newThemeList = oldThemeList.filter((item: any) => themeList.includes(item.name));

      return {
        ...state,
        activeTheme,
        themeList: newThemeList,
        originActiveTheme: activeTheme,
      };
    },
    setActiveTheme(state: any, action: any) {
      const activeTheme = lodash.get(action, 'payload.theme');
      LS.setItem(LSKey.THEME, activeTheme);
      return {
        ...state,
        activeTheme,
      };
    },
    resetActiveTheme(state: any) {
      return {
        ...state,
        activeTheme: state.originActiveTheme,
      };
    },
  },
};
