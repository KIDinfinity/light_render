import lodash from 'lodash';
import { SS, SSKey } from '@/utils/cache';
import { Region, Currency, Env } from './constants';
import { getLocaleLang, getRemoteLang } from './locale';
import { transferToRemoteRegion } from './region';
import getUrlRegion from './getUrlRegion';

interface IRegionParams {
  [Region.ENG]?: any;
  [Region.JP]?: any;
  [Region.TH]?: any;
  [Region.PH]?: any;
  [Region.HK]?: any;
  [Region.MY]?: any;
  [Region.ID]?: any;
  [Region.KH]?: any;
  [Region.VN]?: any;
  notMatch?: any;
}

const getSysConfig = () => SS.getItem(SSKey.CONFIGS) || {};
const getLogindConfig = () => SS.getItem(SSKey.CONFIGS_LOGINED) || {};

export default {
  activeProfile: () => getSysConfig().activeProfile,

  loginMode: () => getSysConfig().loginMode,
  getDictionary: () => SS.getItem(SSKey.DICTIONARY) || {},

  getTenant: () => getSysConfig().tenant,
  getInputLimitDate: () => getSysConfig().inputLimitDate,

  region: (params?: IRegionParams) => {
    const { region = Region.ENG } = getSysConfig();
    if (!params) return region;
    if (!lodash.isUndefined(params[region])) {
      if (typeof params[region] === 'function') return params[region]();
      return params[region];
    }
    if (typeof params.notMatch === 'function') return params.notMatch();
    return params.notMatch;
  },

  /**
   * 部分接口提交的region值需要转换
   */
  remoteRegion: () => transferToRemoteRegion(getSysConfig().region),
  is: (region: Region) => getSysConfig().region === region,
  isENG: () => getSysConfig().region === Region.ENG,
  isJP: () => getSysConfig().region === Region.JP,
  isTH: () => getSysConfig().region === Region.TH,
  isPH: () => getSysConfig().region === Region.PH,
  isHK: () => getSysConfig().region === Region.HK,
  isKH: () => getSysConfig().region === Region.KH,
  isID: () => getSysConfig().region === Region.ID,
  isMY: () => getSysConfig().region === Region.MY,
  isVN: () => getSysConfig().region === Region.VN,

  isSit: () => getSysConfig().activeProfile === Env.Sit,

  dateFormat: () => getSysConfig().dateFormat,

  getLocaleLang,
  getRemoteLang,

  getUrlRegion,

  currencyConfig: () => getLogindConfig()?.currencyConfig,
  getCurrencySymbol: (currency: string) => Currency[currency] || '',
  /**
   * 获取默认的货币单位
   */
  currency: () =>
    lodash.find(getLogindConfig()?.currencyConfig, (item) => item?.isDefault)?.currencyCode || '',
};
