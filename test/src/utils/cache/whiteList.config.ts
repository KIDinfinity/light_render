import { LSKey } from './LSKey';
import { SSKey } from './SSKey';

export default {
  ls: [
    LSKey.DICTIONARY,
    LSKey.THEME,
    LSKey.LANGUAGE,
    LSKey.PROXY,
    LSKey.LOGIN_MODE,
    LSKey.OPUS_REMEMBER_USER,
    LSKey.LAST_TIME_LOGIN_PATHANME,
    LSKey.VENUS_UI_SQLQUERYPARAMS,
    LSKey.SUPPORT_CENTER_REMEMBER_USER,
  ] as string[],
  ss: [SSKey.SSOAUDITLOG, SSKey.SSOLOGIN_RESULT, SSKey.CONFIGS] as string[],
};
