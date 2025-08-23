import lodash from 'lodash';
import { safeParse } from './utils';
import Crypto from './Crypto';

/**
 * 工具类 - sessionStorage
 */
const SS = {
  /**
   * 取
   * @param {string} key
   * @param {Boolean} 是否有执行JSON.parse parsed
   * @return {string}
   */
  getIsDictionary(key) {
    const languageReg = /dictionary/i;
    return languageReg.test(key);
  },
  getItem(key: string, parsed: boolean = true) {
    if (!key) {
      return null;
    }
    if (!sessionStorage.getItem(key)) return null;

    let value = '';
    if (this.getIsDictionary(key)) {
      value = sessionStorage.getItem(key);
    } else {
      value = Crypto.decrypt(sessionStorage.getItem(key));
    }
    if (parsed) {
      return safeParse(value);
    }

    return value;
  },

  /**
   * 取
   * @param {string} key
   * @param {Function} 获取默认值 getDefault
   * @return {string}
   */
  get: async (key: string, parsed: boolean = true, getDefault: () => {}, setDefault = true) => {
    if (!key) {
      return null;
    }

    let value: any = sessionStorage.getItem(key);

    value = Crypto.decrypt(sessionStorage.getItem(key));
    if (parsed) {
      value = safeParse(value);
    }
    if (!value && lodash.isFunction(getDefault)) {
      value = await getDefault();

      if (lodash.isEmpty(value) && setDefault) {
        SS.setItem(key, value);
      }

      if (!lodash.isEmpty(value)) {
        SS.setItem(key, value);
      }
    }

    return value;
  },

  setItem(key: string, value: any) {
    if (!key) {
      return;
    }
    try {
      const newValue = typeof value === 'string' ? value : JSON.stringify(value);
      let content = newValue;
      if (!this.getIsDictionary(key)) {
        content = Crypto.encrypt(newValue);
      }
      sessionStorage.setItem(key, content);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`sessionStorage.setItem(${key}) failed`, {value, e});
    }
  },

  /**
   * 删
   * @param key
   */
  removeItem(key: string) {
    if (key) {
      sessionStorage.removeItem(key);
    }
  },

  /**
   * 清除
   * @param key
   */
  clear() {
    sessionStorage.clear();
  },
};

export default SS;