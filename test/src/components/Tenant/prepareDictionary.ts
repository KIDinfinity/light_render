import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import {
  getLoginLabelDictionary,
  getDropdownDictionary,
  getOtherDictionary,
  getLabelDictionary,
  getSpecialPermissionDictionary,
} from './remote';
import lodash from 'lodash';

/**
 * 存储国际化
 * 1. 获取登录的国际化:getLoginLabelDictionary
 * 2. 获取预加载的国际化:getLabelDictionary
 * 3. 获取下拉国际化:getDropdownDictionary
 * 4. 获取下拉其他的国际化:getOtherDictionary
 */
export default async ({ region }: any) => {
  const loginPage = window.location.href.indexOf('login') > 0;

  if (!!loginPage) {
    const loginLabelDictionary: any = await getLoginLabelDictionary();
    (window as any).dictionary = loginLabelDictionary;
  }
};

const retryCallbacks = async (region: string, callbacks: (() => Promise<false | object>)[] = [], existingDicts = {}, retryTimes = 3) => {
  const retryHelper = async (callback: () => Promise<false | object>, remainingTimes: number = retryTimes): Promise<false | object> => {
    let res = await callback();
    if(!res && remainingTimes > 0) {
      res = await retryHelper(callback, remainingTimes - 1)
      return res;
    }
    return res;
  }
  let finalDicts = existingDicts;
  const resultArr = await Promise.all(callbacks.map(callback => retryHelper(callback)));
  const failedDictionaryArr = resultArr.filter(item => {
    if(item) {
      finalDicts = {
        ...finalDicts,
        ...item,
      }
    }
    return !item;
  });
  (window as any).dictionary = finalDicts;
  if(!failedDictionaryArr.length) {
    SS.setItem(`${SSKey.DICTIONARY}_${region}`, finalDicts);
  }
}

export const prepareLoginedDictionary = async () => {
  const { region }: any = SS.getItem(SSKey.CONFIGS) || {};

  const { companyCode } = LS.getItem(LSKey.CURRENTUSER) || {};

  const dictionary = SS.getItem(`${SSKey.DICTIONARY}_${region}`);

  if (lodash.isEmpty(dictionary)) {
    const callbackArr:  (() => Promise<false | object>)[] = [
      getLabelDictionary,
      getSpecialPermissionDictionary,
      () => getDropdownDictionary({ companyCode }),
      () => getOtherDictionary({ companyCode }),
    ]

    const resultArr = await Promise.all(callbackArr.map(fn => fn()));

    const [
      labelDictionary,
      specialPermissionDictionary,
      dropdownDictionary,
      otherDictionary,
    ] = resultArr;

    const saveDictionary = {
      ...labelDictionary,
      ...specialPermissionDictionary,
      ...dropdownDictionary,
      ...otherDictionary,
    };

    const failedDictionaryArr = resultArr.map((result, index) => result? false : index).filter(index => index !== false);

    if(failedDictionaryArr.length) {
      retryCallbacks(region, failedDictionaryArr.map(index => callbackArr[index]), saveDictionary)
    } else {
      SS.setItem(`${SSKey.DICTIONARY}_${region}`, saveDictionary);
    }
    (window as any).dictionary = saveDictionary;
  } else {
    (window as any).dictionary = dictionary;
  }
};
