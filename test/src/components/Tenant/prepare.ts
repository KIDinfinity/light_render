import moment from 'moment';
import lodash from 'lodash';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { getCurrency, getEnv, getCurrencyDictName } from './remote';
import { regionMap } from './config';
import { Region, DateFormat } from './constants';
import getUrlRegion from './getUrlRegion';
import prepareDictionary, { prepareLoginedDictionary } from './prepareDictionary';

moment.defineLocale('hk', {
  parentLocale: 'en-gb',
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D YYYY',
    LLL: 'MMMM D YYYY HH:mm',
    LLLL: 'dddd, MMMM D YYYY HH:mm',
  },
});

moment.defineLocale('vn', {
  parentLocale: 'en-gb',
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [năm] YYYY',
    LLL: 'D MMMM [năm] YYYY HH:mm',
    LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
  },
});

moment.defineLocale('my', {
  parentLocale: 'en-gb',
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
  },
});

/**
 * 获取region
 * 1. 如果登录后就用登录后的userInfo.region
 * 2. 没有登录用后端返回的region
 * 3. 可以根据url上面的region
 * 4. 默认用EN
 */
const getRegion = (env: any, userInfo: any, oldConfig: any) => {
  // 区域配置

  return (
    userInfo?.region ||
    oldConfig?.region ||
    lodash.upperCase(env?.regionCode) ||
    getUrlRegion() ||
    (Region.ENG as string)
  );
};

// 登录成功后的配置
export default async () => {
  const promise = prepareLoginedDictionary();

  
  // 处理货币列表配置
  let oldConfigLogined: any = SS.getItem(SSKey.CONFIGS_LOGINED);
  if (
    lodash.isPlainObject(oldConfigLogined) &&
    lodash.isArray(oldConfigLogined.currencyConfig) &&
    !lodash.isEmpty(oldConfigLogined.currencyConfig)
  ) {
    await promise;
    return oldConfigLogined;
  }

  const [currency, currencyDict, _] = await Promise.all([getCurrency(), getCurrencyDictName(), promise]);

  const currencyConfig = lodash.map(currency, (item: any) => ({
    ...item,
    currencyName:
      lodash.find(currencyDict, (dict: any) => dict?.dictCode === item?.currencyCode)?.dictName ||
      item.currencyCode,
  }));

  oldConfigLogined = {
    ...oldConfigLogined,
    currencyConfig,
  };

  SS.setItem(SSKey.CONFIGS_LOGINED, oldConfigLogined);

  return oldConfigLogined;
};
interface Config {
  // 当前部署环境 presit|sit
  activeProfile: string;
  // 是否显示忘记密码 Native(显示):这个暂时没有用到
  authenticationChannel: string;
  // 日期显示格式
  dateFormat: string;
  // 登录模式
  loginMode: Object;
  // 当前region
  region: string;
}

export const prepareNoLogin = async () => {
  const oldConfig: Config = SS.getItem(SSKey.CONFIGS);
  const userInfo = LS.getItem(LSKey.CURRENTUSER) || {};

  const env: any = await getEnv();
  // 获取区域
  const region = getRegion(env, userInfo, oldConfig);
  await prepareDictionary({ region });

  if (
    lodash.isPlainObject(oldConfig) &&
    lodash.isString(oldConfig.activeProfile) &&
    lodash.isPlainObject(oldConfig.loginMode) &&
    userInfo?.region === oldConfig?.region &&
    lodash.isString(oldConfig.dateFormat)
  ) {
    moment.locale(oldConfig.dateFormat);
    return oldConfig;
  }

  // 缓存region基本信息
  const {
    activeProfile,
    enableForgetPassword,
    authURL,
    enableSSO,
    oktaClientId,
    oktaAuthUrl,
    inputLimitDate,
    ssoRegion,
    oktaClientIdForVN,
    oktaAuthUrlForVN,
    regionCode,
    webPageTitle,
  }: any = env;
  // 登录配置
  const loginMode = {
    ssoConfig: {
      isOpenSso: enableSSO || false,
      reloadUrl: authURL || '',
      // TODOSSO:转化为数组
      ssoRegion: lodash.isString(ssoRegion) ? ssoRegion.toUpperCase().split(',') : ssoRegion,
      oktaClientId,
      oktaAuthUrl,
      oktaClientIdForVN,
      oktaAuthUrlForVN,
    },
    enableForgetPassword,
    default: {},
  };

  // 时间显示格式
  const dateFormat =
    regionMap.find((item) => item.region === region)?.dateFormat || DateFormat.ENUS;

  const config = {
    ...oldConfig,
    activeProfile,
    loginMode,
    region,
    dateFormat,
    inputLimitDate: inputLimitDate || '',
    regionCode,
    webPageTitle,
  };

  SS.setItem(SSKey.CONFIGS, config);

  // 设置moment的时间格式
  moment.locale(dateFormat);

  return config;
};
