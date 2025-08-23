import { Region, DateFormat, Language } from './constants';

export const regionMap = [
  {
    region: Region.ENG,
    dateFormat: DateFormat.ENGB,
  },
  {
    region: Region.HK,
    dateFormat: DateFormat.HK,
  },
  {
    region: Region.JP,
    dateFormat: DateFormat.JPN,
  },
  {
    region: Region.PH,
    dateFormat: DateFormat.ENUS,
  },
  {
    region: Region.TH,
    dateFormat: DateFormat.ENGB,
  },
  {
    region: Region.ID,
    dateFormat: DateFormat.ENGB,
  },
  {
    region: Region.VN,
    dateFormat: DateFormat.VN,
  },
  {
    region: Region.MY,
    dateFormat: DateFormat.MY,
  },
];

/**
 * 接口Lanuage的Map
 */
export const serviceLanuageMap = [];

/**
 * 国际化语言，UMI或window.navigator.language的值Map到react-intl的值
 */
export const browserLanguageMapToIntl = [
  {
    source: ['ja', Language.JA_JP, 'ja_JP'],
    target: Language.JA_JP,
  },
];

/**
 * react-intl的语言值Map到接口的语言
 */
export const intlLangToRemoteLang = [
  {
    source: [Language.TH],
    target: Language.EN_US,
  },
];

/**
 * 有些Region对应到接口请求是不一致的
 */
export const regionMapToRemote = [
  {
    source: Region.JP,
    target: 'JP',
  },
];
