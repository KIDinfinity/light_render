import lodash from 'lodash';
import { Language } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';

export default {
  namespace: 'language',
  state: {
    activeLanguage: '',
    originActiveLanguage: '',
    languages: [
      {
        name: Language.EN_US,
        title: 'English',
      },
      {
        name: Language.JA_JP,
        title: '日本语',
      },
      {
        name: Language.TH,
        title: 'THai',
      },
    ],
  },
  reducers: {
    initLanguages(state: any, action: any) {
      const { languages: oldLangs } = state;
      const languages = lodash.get(action, 'payload.languages', []);
      const activeLanguage = lodash.get(action, 'payload.language', '');
      // 通过接口返回数据控制展示语言
      const newLanguages = oldLangs.filter((item: any) => languages.includes(item.name));

      return {
        ...state,
        activeLanguage,
        languages: [...newLanguages],
        originActiveLanguage: activeLanguage,
      };
    },

    setActiveLanguage(state: any, action: any) {
      const activeLanguage = lodash.get(action, 'payload.language');
      return {
        ...state,
        activeLanguage,
      };
    },

    resetActiveLanguage(state: any) {
      return {
        ...state,
        activeLanguage: state.originActiveLanguage,
      };
    },

    setLocale(_: any, action: any) {
      const language = lodash.get(action, 'payload.language');
      if (language && LS.getItem(LSKey.LANGUAGE, false) !== language) {
        LS.setItem(LSKey.LANGUAGE, language);
        window.language = language;
        window.location.reload();
      }
    },
  },
};
