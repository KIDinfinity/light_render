import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';
import { browserLanguageMapToIntl, intlLangToRemoteLang } from '../config';
import { Language } from '../constants';

/**
 * 获取国际化的language
 */
export const getLocaleLang = (): Language => {
  const language = window.language || LS.getItem(LSKey.LANGUAGE, false) || window.navigator.language;
  if(!window.language)
    window.language = language;

  return (
    ((lodash.find(browserLanguageMapToIntl, (item: any) => item.source.includes(language)) as any)
      ?.target as Language) ||
    Language[language] ||
    Language.EN_US
  );
};

/**
 * 获取接口用的language
 */
export const getRemoteLang = () => {
  const language: Language = getLocaleLang();

  return (
    ((lodash.find(intlLangToRemoteLang, (item: any) => item.source.includes(language)) as any)
      ?.target as Language) || language
  );
};
